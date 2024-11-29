"use server";

import productSchema from "@/app/models/product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";
import path from "path";
import { z } from "zod";
import connectProductDB from "./productdb";

// Product validator
const productValidator = z.object({
  code: z
    .number()
    .int()
    .positive({ message: "Product code must be a positive integer" }),
  name: z
    .string()
    .min(3)
    .max(50, { message: "Product name must be between 3 and 50 characters" }),
  currentStock: z
    .number()
    .int()
    .nonnegative({ message: "Stock cannot be negative" }),
  cost: z.number().nonnegative({ message: "Buying price cannot be negative" }),
  regularPrice: z
    .number()
    .nonnegative({ message: "Selling price cannot be negative" }),
  discountPrice: z.number().nonnegative().optional(),
  category: z.string(),
  tags: z.array(z.string().max(20)).optional(),
  description: z.string().max(1000).optional(),
  image: z.instanceof(File),
});

export async function addProduct(formData) {
  try {
    const db = await connectProductDB();
    const Product = db.models.Product || db.model("Product", productSchema);

    const productData = {
      code: +formData.get("code"),
      name: formData.get("name"),
      currentStock: +formData.get("currentStock"),
      cost: +formData.get("cost"),
      regularPrice: +formData.get("regularPrice"),
      discountPrice: +formData.get("discountPrice"),
      category: formData.get("category"),
      tags: formData
        .get("tags")
        .split(",")
        .map((element) => element.trim()),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    // // Validate product data using Zod
    // const validation = productValidator.safeParse(Object.fromEntries(formData));

    // if (!validation.success) {
    //   return {
    //     errors: validation.error.flatten().fieldErrors,
    //     message: "Missing Fields. Failed to Sign-up.",
    //   };
    // }

    const file = productData.image;

    // Image upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const sanitizedProductName = productData.name
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "_");
    const newFilename = `${productData.code}_${sanitizedProductName}_${Date.now()}.${file.name.split(".").pop()}`;
    await fs.writeFile(`./public/product_images/${newFilename}`, buffer);

    productData.image = newFilename;

    await Product.create({
      ...productData,
      url: sanitizedProductName,
    });
  } catch (error) {
    console.error("Failed to add product:", error);
    throw new Error("Failed to add product!");
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(_id, formData) {
  const productData = {
    code: +formData.get("code"),
    name: formData.get("name"),
    currentStock: +formData.get("currentStock"),
    cost: +formData.get("cost"),
    regularPrice: +formData.get("regularPrice"),
    discountPrice: +formData.get("discountPrice"),
    category: formData.get("category"),
    tags: formData
      .get("tags")
      .split(",")
      .map((element) => element.trim()),
    description: formData.get("description"),
  };

  const file = formData.get("image");

  try {
    const db = await connectProductDB();
    const Product = db.models.Product || db.model("Product", productSchema);

    // Check if a new image file is uploaded
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const sanitizedProductName = productData.name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_");
      const newFilename = `${productData.code}_${sanitizedProductName}_${Date.now()}.${file.name.split(".").pop()}`;

      // Fetch the existing product to get the current image path
      const existingProduct = await Product.findById(_id);
      const existingImage = existingProduct?.image;

      // Delete the existing image file if it exists
      if (existingImage) {
        const existingImagePath = path.join(
          "./public/product_images",
          existingImage,
        );
        await fs.unlink(existingImagePath).catch((err) => {
          console.error("Failed to delete old image:", err);
        });
      }

      // Save the new image file
      await fs.writeFile(`./public/product_images/${newFilename}`, buffer);

      // Update the product with the new image filename
      await Product.findByIdAndUpdate(_id, {
        ...productData,
        image: newFilename,
      });
    } else {
      // Update the product without changing the image
      await Product.findByIdAndUpdate(_id, productData);
    }
  } catch (error) {
    console.error("Failed to update product:", error);
    throw new Error("Failed to update product!");
  }

  revalidatePath(`/admin/products?code=${productData.code}`);
  redirect(`/admin/products?code=${productData.code}`);
}

export async function deleteProduct(_id) {
  try {
    const db = await connectProductDB();
    const Product = db.models.Product || db.model("Product", productSchema);

    // Find the product by its ID
    const product = await Product.findById(_id);

    if (!product) {
      throw new Error("Product not found!");
    }

    // Get the image filename from the product document
    const { productImage } = product;

    // Delete the product from the database
    await Product.findByIdAndDelete(_id);

    // If there is an associated image, delete it from the filesystem
    if (productImage) {
      const imagePath = path.join("./public/product_images", productImage);
      await fs.unlink(imagePath).catch((err) => {
        console.error("Failed to delete product image:", err);
      });
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

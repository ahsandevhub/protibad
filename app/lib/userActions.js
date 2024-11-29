"use server";

import citizenSchema from "@/app/models/citizen";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendSignupEmail } from "./sendMail";
import connectUserDB from "./usersdb";

// customer validator
const customerValidator = z
  .object({
    name: z.string().min(3, {
      message: "Customer name must be greater than 3 character",
    }),
    phone: z.string().regex(/^01[0-9]{9}$/, {
      message: "Phone number must be a valid Bangladeshi number",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    cpassword: z.string(),
    city: z.string().min(1, {
      message: "City is required",
    }),
    address: z.string().min(10, {
      message: "Address must be at least 10 characters long",
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  });

export async function addCustomer(prevState, formData) {
  // Validate form data using Zod
  const validation = customerValidator.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    // Return validation errors
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Sign-up.",
    };
  }

  const { name, phone, email, password, city, address } = validation.data;

  // Hash the password
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);

    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingCustomer) {
      const errors = {};
      if (existingCustomer.email === email) {
        errors.email = ["Email already exists."];
      }
      if (existingCustomer.phone === phone) {
        errors.phone = ["Phone number already exists."];
      }
      return {
        errors,
        message: "Failed to Sign-up due to existing user data.",
      };
    }

    await Customer.create({
      name,
      phone,
      email,
      password: hashedPassword,
      city,
      address,
    });
    await sendSignupEmail(email, name);
  } catch (error) {
    console.error("Error adding customer:", error);
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Database Error: Failed to Add Customer.",
    };
  }

  redirect("/login?message=Sign-up%20Successful,%20Please%20login!");
}

export async function addToCart(userId, formData) {
  const productId = formData.get("productId");
  const qty = +formData.get("qty") || 1;

  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);

    // Find the customer by userId
    const customer = await Customer.findById(userId);

    if (!customer) {
      console.error("Customer not found");
      throw new Error("Customer not found!");
    }

    // Check if the product already exists in the cart
    const existingCartItem = customer.cart.find(
      (item) => item._id.toString() === productId.toString() // Ensure both are strings for comparison
    );

    if (existingCartItem) {
      existingCartItem.qty += qty;
    } else {
      customer.cart.push({ _id: productId, qty });
    }

    customer.markModified("cart");

    // Save the customer with the updated cart
    await customer.save();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add product to cart!");
  }

  revalidatePath("/");
}

export async function updateCartItemQty(userId, formData) {
  const productId = formData.get("productId");
  const newQty = +formData.get("qty"); // Get the new quantity

  try {
    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);

    // Find the customer by userId
    const customer = await Customer.findById(userId);

    if (!customer) {
      console.error("Customer not found");
      throw new Error("Customer not found!");
    }

    // Check if the product exists in the cart
    const existingCartItem = customer.cart.find(
      (item) => item._id.toString() === productId.toString()
    );

    if (existingCartItem) {
      if (newQty <= 0) {
        // If the new quantity is zero or less, remove the item from the cart
        customer.cart = customer.cart.filter(
          (item) => item._id.toString() !== productId.toString()
        );
      } else {
        // Update the item quantity
        existingCartItem.qty = newQty;
      }
    } else {
      throw new Error("Item not found in cart!");
    }

    customer.markModified("cart");

    // Save the customer with the updated cart
    await customer.save();
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw new Error("Failed to update cart item quantity!");
  }

  revalidatePath("/my-cart");
}

export async function removeCartItem(userId, formData) {
  const productId = formData.get("productId");

  try {
    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);

    console.log("user id:" + userId);
    console.log("product id:" + productId);

    // Find the customer by userId
    const customer = await Customer.findById(userId);

    if (!customer) {
      console.error("Customer not found");
      throw new Error("Customer not found!");
    }

    // Check if the product exists in the cart and remove it
    const existingCartItemIndex = customer.cart.findIndex(
      (item) => item._id.toString() === productId.toString()
    );

    if (existingCartItemIndex > -1) {
      // Remove the item from the cart array
      customer.cart.splice(existingCartItemIndex, 1);
    } else {
      throw new Error("Item not found!");
    }

    customer.markModified("cart");

    // Save the customer with the updated cart
    await customer.save();
  } catch (error) {
    console.error("Error removing product:", error);
    throw new Error("Failed to remove cart product!");
  }

  revalidatePath("/my-cart");
}

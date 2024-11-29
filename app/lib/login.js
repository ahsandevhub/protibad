"use server";

import adminSchema from "@/app/models/admin";
import citizenSchema from "@/app/models/citizen";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectUserDB from "./usersdb";

export async function adminLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const db = await connectUserDB();
    const Admin = db.models.Admin || db.model("Admin", adminSchema);
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return { message: "Invalid credentials" };
    }

    // Direct comparison without bcrypt (temporary approach)
    if (password !== admin.password) {
      return { message: "Invalid credentials" };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    cookies().set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }

  redirect("/admin/dashboard");
}

export async function customerLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return { message: "Invalid Credentials", status: 404 };
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return { message: "Invalid credentials", status: 401 };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: customer._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Adjust expiration as needed
    );

    cookies().set("customerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error", status: 500 };
  }

  redirect("/my-account");
}

export async function customerLogout() {
  cookies().delete("customerToken");
}

export async function adminLogout() {
  cookies().delete("adminToken");
}

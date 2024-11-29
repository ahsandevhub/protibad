"use server";

import { compare } from "bcryptjs"; // Use compare from bcryptjs
import citizenSchema from "../models/citizen";
import connectUserDB from "./usersdb";

// The server-side function to login a citizen user
export default async function loginCitizen(formData) {
  // Extract citizen data from formData
  const phone = formData.get("phone");
  const password = formData.get("password");

  const db = await connectUserDB();
  const Citizen = db.models.Citizen || db.model("Citizen", citizenSchema);

  // Find the citizen by phone number
  const existingUser = await Citizen.findOne({ phone });

  if (!existingUser) {
    // If no user exists with the given phone number
    return {
      success: false,
      message: "ফোন নম্বরটি সঠিক নয়। দয়া করে আবার চেষ্টা করুন।", // "The phone number is incorrect. Please try again."
    };
  }

  // Compare the entered password with the hashed password in the database
  const isPasswordValid = await compare(password, existingUser.password);

  if (!isPasswordValid) {
    // If the password is invalid
    return {
      success: false,
      message: "পাসওয়ার্ড সঠিক নয়। দয়া করে আবার চেষ্টা করুন।", // "The password is incorrect. Please try again."
    };
  }

  // If login is successful, return success and user data
  return {
    success: true,
    message: "লগিন সফল হয়েছে!", // "Login successful!"
  };
}

"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import citizenSchema from "../models/citizen";
import connectUserDB from "./usersdb";

// The server-side function to create a new citizen user
export async function registerCitizen(formData) {
  // Extract citizen data from formData
  const fullName = formData.get("fullName");
  const nationalId = formData.get("nationalId");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const division = formData.get("division");
  const district = formData.get("district");
  const upazila = formData.get("upazila");
  const union = formData.get("union");
  const details = formData.get("details");

  const db = await connectUserDB();
  const Citizen = db.models.Citizen || db.model("Citizen", citizenSchema);

  // Check if the user already exists based on email or nationalId
  const existingUser = await Citizen.findOne({
    $or: [{ email }, { nationalId }, { phone }],
  });

  if (existingUser) {
    // Return an object with the message instead of throwing an error
    return {
      success: false,
      message:
        "User with this email, national ID, or phone number already exists.",
    };
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create the new citizen in the database
  const newUser = new Citizen({
    fullName,
    nationalId,
    email,
    phone,
    password: hashedPassword,
    address: {
      division,
      district,
      upazila,
      union,
      details,
    },
  });

  // Save the new user in the database
  await newUser.save();

  redirect("/login");
}

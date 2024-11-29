"use server";

import citizenSchema from "../models/citizen";
import connectUserDB from "./usersdb";

export async function fetchCustomer(id) {
  try {
    const db = await connectUserDB();
    const Customer = db.models.Customer || db.model("Customer", citizenSchema);

    const customer = await Customer.findById(id).lean();

    if (!customer) {
      return { error: "Customer not found", status: 404 };
    }

    customer._id = customer._id.toString();
    return customer;
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    return { error: "Failed to fetch customer", status: 500 };
  }
}

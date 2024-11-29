"use server";

import fs from "fs/promises";
import path from "path";
import complaintSchema from "../models/complaint";
import connectComplaintDB from "./complaintdb";

export async function handleComplaint(data) {
  // Parse the form data
  const {
    complaint,
    complaintType,
    details,
    file, // Assuming this is a file object
  } = Object.fromEntries(data);

  const db = await connectComplaintDB();
  const Complaint =
    db.models.Complaint || db.model("Complaint", complaintSchema);

  let fileName = null;

  try {
    // Save the file in the public/attachments directory if it exists
    if (file) {
      const attachmentsDir = path.join(process.cwd(), "public", "attachments");
      await fs.mkdir(attachmentsDir, { recursive: true }); // Ensure the directory exists

      // Generate a unique filename to avoid overwriting
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(attachmentsDir, uniqueFileName);

      // Write the file to the server
      await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      fileName = uniqueFileName; // Store the filename
    }

    // Save the complaint to the database
    const newComplaint = new Complaint({
      complaint,
      complaintType,
      details,
      file: fileName, // Save the filename in the database
    });

    await newComplaint.save();

    return { success: true, message: "অভিযোগ জমা দেওয়া হয়েছে!" };
  } catch (error) {
    console.error("Error saving complaint:", error);
    return {
      success: false,
      message: "সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
    };
  }
}

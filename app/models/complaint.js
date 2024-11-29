import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    complaint: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
      maxlength: 100, // Limits the title length to 100 characters
    },
    complaintType: {
      type: String,
      required: true,
      enum: ["service", "government", "others"], // Only allows specific values
    },
    details: {
      type: String,
      required: true,
      trim: true,
      minlength: 10, // Ensures a minimum length for better input
    },
    file: {
      type: String, // Store file path, URL, or filename
      default: null, // File is optional
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the current date
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export default complaintSchema;

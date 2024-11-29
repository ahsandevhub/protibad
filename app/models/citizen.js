import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: "citizen",
    },

    // Personal Details
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },

    // Contact Information
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
    },

    phone: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate phone numbers
      match: /^01[3-9]\d{8}$/, // Validates Bangladeshi phone number format
    },

    password: {
      type: String,
      required: true,
    },

    // Address
    address: {
      division: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      upazila: {
        type: String,
        required: true,
      },
      union: {
        type: String,
        required: true,
      },
      details: {
        type: String, // Extra details like house/street number
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export default citizenSchema;

"use client";

import { useState } from "react";

const ComplaintPage = () => {
  // State for handling form input
  const [complaint, setComplaint] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [complaintType, setComplaintType] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("অভিযোগ জমা দেওয়া হয়েছে!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          অভিযোগ জমা দিন
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Complaint Title */}
          <div>
            <label
              htmlFor="complaint"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              অভিযোগের বিষয়
            </label>
            <input
              type="text"
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="অভিযোগের বিষয় লিখুন"
              required
            />
          </div>

          {/* Complaint Type (Dropdown) */}
          <div>
            <label
              htmlFor="complaintType"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              অভিযোগের ধরণ
            </label>
            <select
              id="complaintType"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="" disabled>
                অভিযোগের ধরণ নির্বাচন করুন
              </option>
              <option value="service">সেবা সম্পর্কিত</option>
              <option value="government">সরকারি প্রতিষ্ঠান</option>
              <option value="law">আইন বা আইনশৃঙ্খলা</option>
              <option value="others">অন্যান্য</option>
            </select>
          </div>

          {/* Complaint Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              বিস্তারিত বর্ণনা
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="4"
              className="w-full h-52 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="আপনার অভিযোগের বিস্তারিত বর্ণনা দিন"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label
              htmlFor="file"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              প্রমাণ সংযুক্ত করুন (ছবি/ভিডিও)
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {file && (
              <div className="mt-2 text-gray-600 text-sm">
                <strong>নির্বাচিত ফাইল:</strong> {file.name}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
            >
              অভিযোগ জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;

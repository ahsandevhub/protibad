"use client";

import { handleComplaint } from "@/app/lib/registerComplaint";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ComplaintPage = () => {
  const [complaint, setComplaint] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData();
    formData.append("complaint", complaint);
    formData.append("complaintType", complaintType);
    formData.append("details", details);
    if (file) formData.append("file", file);

    const response = await handleComplaint(formData);

    if (!response.success) {
      // Show success message
      alert(response.message);
      setIsPending(false);
    } else {
      // Show error message
      alert("আপনার অভিযোগ জমা হয়েছে!");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          অভিযোগ জমা দিন
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Complaint Subject */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="অভিযোগের বিষয় লিখুন"
              required
            />
          </div>

          {/* Complaint Type */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                অভিযোগের ধরণ নির্বাচন করুন
              </option>
              <option value="service">চাঁদাবাজি</option>
              <option value="government">
                সরকারি প্রতিষ্ঠানের অনিয়ম/দূর্নিতি
              </option>
              <option value="government">জনপ্রতিনিধির অনিয়ম/দূর্নিতি</option>
              <option value="others">
                নিত্য প্রয়োজনীয় দ্রব্যের অতিরিক্ত মূল্য আদায়{" "}
              </option>
              <option value="others">সরকারি অবকাঠামো নির্মাণে অনিয়ম </option>
              <option value="others">অনলাইনে গুজব/সাইবার ক্রাইম </option>
              <option value="others">সরকারি ত্রাণ বিতরণে অনিয়ম </option>
              <option value="others">খাদ্যে ভেজাল মেশানো/বিক্রি </option>
              <option value="others">মাদক সেবন/বেচা কেনা </option>
              <option value="others">দালাল/প্রতারক চক্রের সন্ধান</option>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              rows="5"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            {file && (
              <p className="mt-2 text-gray-600 text-sm">
                <FaCloudUploadAlt className="inline mr-2 text-red-500" />
                {file.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className={`${
                isPending ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition`}
            >
              {isPending ? "অভিযোগ জমা হচ্ছে..." : "অভিযোগ জমা দিন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintPage;

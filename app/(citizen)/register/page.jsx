"use client";

import { useState } from "react";
import {
  FaArrowDown,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa"; // Import icons from react-icons/fa
import { districts, divisions, unions, upazilas } from "../../lib/data";
import { registerCitizen } from "../../lib/registerCitizen";
import Breadcrumb from "../Breadcrumb";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila("");
    setSelectedUnion("");
  };

  const handleUpazilaChange = (e) => {
    setSelectedUpazila(e.target.value);
    setSelectedUnion("");
  };

  const handleUnionChange = (e) => {
    setSelectedUnion(e.target.value);
  };

  async function handleFormSubmit(event) {
    setIsPending(true);
    event.preventDefault();

    const formData = new FormData(event.target);

    // Call the registerCitizen function
    const response = await registerCitizen(formData);

    if (!response.success) {
      // Show success message
      alert(response.message);
      setIsPending(false);
    } else {
      // Show error message
      alert("আপনার রেজিস্ট্রেশন সফল হয়েছে!");
      setIsPending(true);
    }
  }

  const DownArrow = () => {
    return (
      <div className="flex justify-center pb-5">
        <div className="relative w-12 h-1 bg-gray-300 rounded-full">
          <div className="absolute transform left-1/2 -translate-x-1/2">
            <FaArrowDown className="text-gray-500 text-2xl" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-20 sm:px-6 lg:px-8">
      <Breadcrumb path="register" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column (Instructions) */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
            কিভাবে রেজিস্ট্রেশন করবেন?
          </h2>
          <p className="text-gray-700 sm:text-lg text-base mb-6 text-center">
            নিবন্ধন করতে নিচের ফর্মটি পূর্ণ করুন। আপনার পূর্ণ নাম, ইমেইল ঠিকানা,
            ফোন নম্বর এবং বর্তমান ঠিকানা দিন। এছাড়া শর্তাবলী মেনে নিবেন।
          </p>

          {/* Steps with Icons and Flowchart */}
          <div className="space-y-5">
            {/* Step 1 */}
            <div className="flex flex-col items-center justify-center gap-4">
              <FaUser className="text-3xl sm:text-red text-2xl-600" />
              <p className="sm:text-xl text-base text-gray-700">
                ১. আপনার ব্যক্তিগত তথ্য প্রদান করুন।
              </p>
            </div>
            <DownArrow />

            {/* Step 2 */}
            <div className="flex flex-col items-center justify-center gap-4">
              <FaIdCard className="sm:text-3xl text-2xl text-red-600" />
              <p className="sm:text-xl text-base text-gray-700">
                ২. সঠিক জাতীয় পরিচয়পত্র নম্বর প্রদান করুন।
              </p>
            </div>
            <DownArrow />

            {/* Step 3 */}
            <div className="flex flex-col items-center justify-center gap-4">
              <FaMapMarkerAlt className="sm:text-3xl text-2xl text-red-600" />
              <p className="sm:text-xl text-base text-gray-700">
                ৩. আপনার বর্তমান ঠিকানা লিখুন।
              </p>
            </div>
            <DownArrow />

            {/* Step 4 */}
            <div className="flex flex-col items-center justify-center gap-4">
              <FaCheckCircle className="sm:text-3xl text-2xl text-red-600" />
              <p className="sm:text-xl text-base text-gray-700">
                ৪. শর্তাবলী মেনে নিবেন।
              </p>
            </div>
            <DownArrow />

            {/* Step 5 */}
            <div className="flex flex-col items-center justify-center gap-4">
              <FaCheckCircle className="sm:text-3xl text-2xl text-green-600" />
              <p className="sm:text-xl text-base text-gray-700">
                ৫. রেজিস্ট্রেশন সম্পন্ন হবে।
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Registration Form) */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
            নাগরিক নিবন্ধন ফর্ম
          </h2>

          <form onSubmit={handleFormSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                পূর্ণ নাম
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                required
              />
            </div>

            {/* National Id */}
            <div className="mb-4">
              <label
                htmlFor="nationalId"
                className="block text-gray-700 font-medium mb-2"
              >
                জাতীয় পরিচয়পত্র নম্বর (NID)
              </label>
              <input
                type="number"
                id="nationalId"
                name="nationalId"
                min={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার জাতীয় পরিচয়পত্র নম্বর লিখুন"
                required
              />
            </div>

            {/* Email Address */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                ইমেইল অ্যাড্রেস
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার ইমেইল লিখুন"
                // required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                ফোন নম্বর
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="আপনার ফোন নম্বর লিখুন"
                required
              />
            </div>

            {/* Division */}
            <div className="mb-4">
              <label
                htmlFor="division"
                className="block text-gray-700 font-medium mb-2"
              >
                বিভাগ
              </label>
              <select
                id="division"
                name="division"
                value={selectedDivision}
                onChange={handleDivisionChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">-- নির্বাচন করুন --</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-gray-700 font-medium mb-2"
              >
                জেলা
              </label>
              <select
                id="district"
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedDivision}
                required
              >
                <option value="">-- নির্বাচন করুন --</option>
                {selectedDivision &&
                  districts[selectedDivision]?.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="mb-4">
              <label
                htmlFor="upazila"
                className="block text-gray-700 font-medium mb-2"
              >
                উপজেলা
              </label>
              <select
                id="upazila"
                name="upazila"
                value={selectedUpazila}
                onChange={handleUpazilaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedDistrict}
                required
              >
                <option value="">-- নির্বাচন করুন --</option>
                {selectedDistrict &&
                  Object.entries(upazilas[selectedDistrict])?.map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value[0]}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* Union */}
            <div className="mb-4">
              <label
                htmlFor="union"
                className="block text-gray-700 font-medium mb-2"
              >
                ইউনিয়ন
              </label>
              <select
                id="union"
                name="union"
                value={selectedUnion}
                onChange={handleUnionChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedUpazila}
                required
              >
                <option value="">-- নির্বাচন করুন --</option>
                {selectedUpazila &&
                unions[selectedUpazila] &&
                Object.entries(unions[selectedUpazila]).length > 0 ? (
                  Object.entries(unions[selectedUpazila]).map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value[0]}
                      </option>
                    )
                  )
                ) : (
                  <option disabled>দুঃখিত, কোনো ইউনিয়ন পাওয়া যায়নি</option>
                )}
              </select>
            </div>

            {/* Address Details */}
            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-gray-700 font-medium mb-2"
              >
                গ্রাম/রাস্তা/বাড়ি নং/মহল্লা
              </label>
              <input
                type="text"
                id="details"
                name="details"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="বিস্তারিত ঠিকানা লিখুন"
                required
              />
            </div>

            {/* Password and Confirm Password Fields with Show Password Icon */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaEye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="পাসওয়ার্ডটি পুনরায় লিখুন"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FaEye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 text-red-600 focus:ring-0"
                required
              />
              <label htmlFor="terms" className="ml-2 text-gray-600">
                আমি সমস্ত শর্তাবলী মেনে নিচ্ছি
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isPending
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex justify-center items-center space-x-2">
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8V4a12 12 0 0 0 0 24v-4a8 8 0 0 1-8-8z"
                      />
                    </svg>
                    <span>রেজিস্ট্রেশন চলমান...</span>
                  </div>
                ) : (
                  "রেজিস্টার করুন"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons/fa
import { loginCitizen } from "../../lib/loginCitizen"; // Adjusted to a login function
import Breadcrumb from "../Breadcrumb";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(""); // Reset error message

    const formData = new FormData(event.target);
    const response = await loginCitizen(formData);

    if (response.success) {
      alert("লগিন সফল হয়েছে!");
      // You may redirect to the next page, e.g., dashboard
      window.location.href = "/dashboard"; // Adjust the redirect as needed
    } else {
      setErrorMessage(response.message); // Set the error message
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-20 sm:px-6 lg:px-8">
      <Breadcrumb path="login" />
      <div className="max-w-xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
            প্রতিবাদ অ্যাপে লগিন করুন
          </h2>

          <p className="text-gray-700 sm:text-lg text-base mb-6 text-center">
            লগিন করতে নিচের ফর্মটি পূর্ণ করুন। আপনার ফোন নম্বর এবং পাসওয়ার্ড
            প্রদান করুন।
          </p>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
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

            {/* Password Fields with Show Password Icon */}
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

            {/* Remember Me (Optional) */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-red-600 focus:ring-0"
              />
              <label htmlFor="remember" className="ml-2 text-gray-600">
                আমাকে মনে রাখুন
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
                    <span>লগিন চলমান...</span>
                  </div>
                ) : (
                  "লগিন করুন"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import Logo from "@/public/protibad icon-01.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sm:py-4 py-3 sticky top-0 z-50 bg-white text-gray-800 border-b">
      <div className="container flex items-center justify-between max-w-screen-xl mx-auto px-4">
        {/* Logo Section */}
        <Link href={"/"} className="logo flex items-center">
          <Image src={Logo} alt="প্রতিবাদ লোগো" className="h-12 w-auto" />
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl leading-none text-red-600 font-bold">
              প্রতিবাদ
            </h1>
            <span className="text-sm leading-none text-gray-600">
              যেখানে অন্যায় সেখানেই প্রতিবাদ
            </span>
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-800 sm:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`nav fixed sm:static top-0 left-0 w-full h-screen sm:h-auto sm:w-auto bg-white sm:bg-transparent sm:flex ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-5 h-full sm:h-auto">
            <li>
              <Link
                href={"/"}
                className="font-medium text-md hover:text-red-600 hover:border-b-2 border-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                হোম পেজ
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className="font-medium text-md hover:text-red-600 hover:border-b-2 border-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                রেজিস্ট্রেশন করুন
              </Link>
            </li>
            <li>
              <Link
                href={"/#nirdeshona"}
                className="font-medium text-md hover:text-red-600 hover:border-b-2 border-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                নির্দেশনা দেখুন
              </Link>
            </li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="buttons hidden sm:flex items-center gap-5">
          <Link
            href={"/register"}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 hover:shadow rounded-lg font-medium text-white transition-all"
          >
            রেজিস্টার করুন
          </Link>
          <Link
            href={"/login"}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 hover:shadow rounded-lg font-medium text-white transition-all"
          >
            লগিন করুন
          </Link>
        </div>
      </div>

      {/* Mobile Buttons */}
      {isMenuOpen && (
        <div className="flex flex-col items-center gap-4 mt-4 sm:hidden">
          <Link
            href={"/register"}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 hover:shadow rounded-lg font-medium text-white transition-all w-3/4 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            রেজিস্টার করুন
          </Link>
          <Link
            href={"/login"}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 hover:shadow rounded-lg font-medium text-white transition-all w-3/4 text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            লগিন করুন
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

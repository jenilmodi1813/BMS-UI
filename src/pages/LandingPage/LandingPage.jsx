import React from "react";
import poster from "../../assets/poster.jfif"; // go up 2 levels: LandingPage -> pages -> src

import {
  FaLock,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="py-10 md:pl-[100px] px-5 md:flex justify-between items-start bg-gray-50">
      {/* Left Section */}
      <div className="md:w-[50%] flex flex-col mt-8 md:mt-10 items-center md:items-start">
        {/* Heading */}
        <h1 className="text-5xl md:text-5xl mb-6 font-semibold text-gray-700 leading-tight tracking-tight text-center md:text-left w-[80%]">
          Secure, Smart & Seamless Banking for Everyone
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-base mb-8 w-[80%] text-center md:text-left">
          Manage your money effortlessly — from savings to investments, all in one
          secure digital platform. Experience modern banking at your fingertips.
        </p>

        {/* Features Icons */}
        <div className="grid grid-cols-2 gap-5 w-[80%] mb-8">
          <div className="flex items-center gap-3">
            <FaLock className="text-blue-700 text-2xl" />
            <span className="text-gray-600">Secure Transactions</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600 text-2xl" />
            <span className="text-gray-600">Instant Payments</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMobileAlt className="text-indigo-600 text-2xl" />
            <span className="text-gray-600">Mobile Banking</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUserFriends className="text-orange-500 text-2xl" />
            <span className="text-gray-600">24/7 Customer Support</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-[80%] flex flex-col gap-3">
          <Link to="/login">
            <button className="w-full py-3 bg-blue-500 text-white rounded-3xl font-medium hover:bg-blue-800 transition">
              Login to Your Account
            </button>
          </Link>

          <Link to="/signUp">
            <button className="w-full py-3 bg-white border border-blue-700 text-blue-700 rounded-3xl font-medium hover:bg-blue-50 transition">
              Create New Account
            </button>
          </Link>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 w-[80%] mt-6 leading-5 text-center md:text-left">
          By continuing, you agree to{" "}
          <span className="text-blue-800 cursor-pointer hover:underline">
            Banking System’s Terms of Use
          </span>{" "}
          and{" "}
          <span className="text-blue-800 cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      </div>

      {/* Right Section (Image) */}
      <div className="md:w-[50%] mt-30 md:mt-0 flex justify-center">
        <img
          className="w-full max-w-[550px] h-auto object-cover rounded-lg shadow-md"
          src={poster}
          alt="Banking illustration"
        />
      </div>
    </div>
  );
};

export default LandingPage;

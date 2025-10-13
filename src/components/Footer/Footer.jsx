import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-8 md:px-[100px] px-5 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left Section - Logo & Description */}
        <div className="flex flex-col gap-2 md:w-[40%]">
          <div className="flex items-center gap-2">
            <h3 className="text-blue-700 font-bold text-2xl">BankMate</h3>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
              alt="Bank Logo"
              className="w-6 h-6"
            />
          </div>
          <p className="text-sm text-gray-600">
            BankMate – your trusted partner for secure, fast, and smart digital banking.
            Manage your accounts, transfer funds, and pay bills with ease.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-800 mb-1">Quick Links</h4>
          <a href="/dashboard" className="hover:text-blue-700 text-sm">Dashboard</a>
          <a href="/accounts" className="hover:text-blue-700 text-sm">Accounts</a>
          <a href="/transfer" className="hover:text-blue-700 text-sm">Transfers</a>
          <a href="/payments" className="hover:text-blue-700 text-sm">Payments</a>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-800 mb-1">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="hover:text-blue-700"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-700"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-700"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} BankMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

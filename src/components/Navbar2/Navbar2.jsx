import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { login } from "../../utils/auth";

const Navbar2 = () => {

  // login(response.data.token); // save token
  // setIsLogin(true); // update App state
  // navigate("/dashboard");
  return (
    <nav className="w-full bg-gray-100 md:px-[100px] px-5 flex justify-between py-4 items-center shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <h3 className="text-blue-500 font-bold text-3xl">BankMate</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
          alt="Bank Logo"
          className="w-7 h-7"
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-gray-700 font-medium hover:text-blue-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/accounts"
          className="text-gray-700 font-medium hover:text-blue-700 transition"
        >
          Accounts
        </Link>
        <Link
          to="/transfer"
          className="text-gray-700 font-medium hover:text-blue-700 transition"
        >
          Transfer
        </Link>
        <Link
          to="/payments"
          className="text-gray-700 font-medium hover:text-blue-700 transition"
        >
          Payments
        </Link>

        {/* Notification Icon */}
        <button className="relative text-gray-700 hover:text-blue-700 transition">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* User Avatar Dropdown */}
        <div className="relative group">
          <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-blue-700 transition" />
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-all z-10">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;

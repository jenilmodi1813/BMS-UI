import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoanBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-50 md:px-[100px] px-5 flex justify-between py-4 items-center shadow-sm border-b border-blue-100 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <h3 className="text-blue-500 font-bold text-3xl">BankMate</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
          alt="Bank Logo"
          className="w-7 h-7"
        />
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* Clickable Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 transition text-lg flex items-center gap-1"
          >
            Loan Services ▾
          </button>
          {isOpen && (
            <div className="absolute bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-48 z-50">
              <Link
                to="/loan/apply"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Apply Loan
              </Link>
              <Link
                to="/loan/status"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Loan Status
              </Link>
              <Link
                to="/loan/eligibility"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Check Eligibility
              </Link>
              <Link
                to="/loan/history"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Loan History
              </Link>
            </div>
          )}
        </div>

        {/* Other Links */}
        <Link
          to="/loan/support"
          className="text-gray-700 hover:text-blue-600 transition text-lg"
        >
          Support
        </Link>

        <Link
          to="/loan"
          className="text-blue-600 border border-blue-600 px-4 py-1.5 rounded-3xl text-lg hover:bg-blue-600 hover:text-white transition"
        >
          Back to Home
        </Link>
      </div>
    </nav>
  );
};

export default LoanBar;

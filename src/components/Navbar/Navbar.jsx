import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../redux/auth/slice"; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(reduxLogout());
    localStorage.removeItem("auth"); // optional: clear localStorage too
    navigate("/login");
  };

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

      {/* Conditional Rendering Based on Auth State */}
      {isAuthenticated && user ? (
        /* Logged-in Navbar (Navbar2 style) */
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-gray-700 font-medium hover:text-blue-700 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/account"
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

          {/* Notification Bell */}
          <button className="relative text-gray-700 hover:text-blue-700 transition">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative group">
            <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-blue-700 transition" />
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-all z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user.email || "User"}
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Guest Navbar (Navbar1 style) */
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            to="/signUp"
            className="px-4 py-2 text-black rounded-3xl text-lg hover:bg-gray-200 transition"
          >
            Open Account
          </Link>

          <Link
            to="/loan"
            className="px-4 py-2 text-black rounded-3xl text-lg hover:bg-gray-200 transition"
          >
            Apply Loan
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 border border-blue-700 text-blue-700 rounded-3xl text-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
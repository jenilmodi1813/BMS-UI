import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../redux/auth/auth.slice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Dropdown states
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Timeout refs to manage hover delays
  const loanTimeoutRef = React.useRef(null);
  const userTimeoutRef = React.useRef(null);

  const handleLogout = () => {
    dispatch(reduxLogout());
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const isLoanPage = location.pathname.startsWith("/loan");
  const isLoanLanding = location.pathname === "/loan";

  const backToHomeLink = isAuthenticated
    ? isLoanLanding
      ? "/dashboard"
      : "/dashboard"
    : isLoanLanding
    ? "/"
    : "/";

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (loanTimeoutRef.current) clearTimeout(loanTimeoutRef.current);
      if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
    };
  }, []);

  // Loan dropdown handlers
  const handleLoanMouseEnter = () => {
    if (loanTimeoutRef.current) {
      clearTimeout(loanTimeoutRef.current);
      loanTimeoutRef.current = null;
    }
    setIsLoanDropdownOpen(true);
  };

  const handleLoanMouseLeave = () => {
    loanTimeoutRef.current = setTimeout(() => {
      setIsLoanDropdownOpen(false);
    }, 200);
  };

  // User dropdown handlers
  const handleUserMouseEnter = () => {
    if (userTimeoutRef.current) {
      clearTimeout(userTimeoutRef.current);
      userTimeoutRef.current = null;
    }
    setIsUserDropdownOpen(true);
  };

  const handleUserMouseLeave = () => {
    userTimeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 200);
  };

  return (
    <nav
      className={`w-full ${
        isLoanPage ? "bg-blue-50 border-b border-blue-100" : "bg-gray-100"
      } md:px-[100px] px-5 flex justify-between py-4 items-center shadow-sm relative`}
    >
      {/* ------------ Logo Section ------------ */}
      <Link
        to={backToHomeLink}
        className="flex items-center gap-2 cursor-pointer"
      >
        <h3 className="text-blue-500 font-bold text-3xl">BankMate</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3077/3077193.png"
          alt="Bank Logo"
          className="w-7 h-7"
        />
      </Link>

      {/* ------------ Authenticated Navbar ------------ */}
      {isAuthenticated && user ? (
        <div className="flex items-center gap-6 text-gray-700 text-lg">
          <Link to="/dashboard" className="hover:text-blue-700 transition">
            Dashboard
          </Link>

          <Link to="/accounts" className="hover:text-blue-700 transition">
            Accounts
          </Link>

          {/* -------- Loans Dropdown -------- */}
          <div
            className="relative"
            onMouseEnter={handleLoanMouseEnter}
            onMouseLeave={handleLoanMouseLeave}
          >
            <button className="flex items-center gap-1 hover:text-blue-700 transition">
              Loans ▾
            </button>

            {isLoanDropdownOpen && (
              <div
                className="absolute bg-white border border-gray-200 rounded-lg shadow-md mt-2 w-52 z-50"
                onMouseEnter={handleLoanMouseEnter}
                onMouseLeave={handleLoanMouseLeave}
              >
                <Link
                  to="/loan/apply/home"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Home Loan
                </Link>
                <Link
                  to="/loan/apply/car"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Car Loan
                </Link>
                <Link
                  to="/loan/personal"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Personal Loan
                </Link>
                <Link
                  to="/loan/education"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Education Loan
                </Link>
                <Link
                  to="/loan/status"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Loan Status
                </Link>
                <Link
                  to="/loan-history"
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Loan History
                </Link>
              </div>
            )}
          </div>

          <Link to="/transfer" className="hover:text-blue-700 transition">
            Transfer
          </Link>
          <Link to="/payments" className="hover:text-blue-700 transition">
            Payments
          </Link>

          {/* -------- User Dropdown -------- */}
          <div
            className="relative"
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
          >
            <FaUserCircle className="text-3xl text-gray-700 cursor-pointer hover:text-blue-700 transition" />
            {isUserDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md border border-gray-100 z-50"
                onMouseEnter={handleUserMouseEnter}
                onMouseLeave={handleUserMouseLeave}
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user.firstName || "User"}
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
            )}
          </div>
        </div>
      ) : (
        // ------------ Guest Navbar ------------
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
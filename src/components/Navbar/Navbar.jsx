
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../redux/auth/auth.slice";

import logo from "../../assets/bank_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Dropdown states
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Timeout refs
  const loanTimeoutRef = useRef(null);
  const userTimeoutRef = useRef(null);

  const handleLogout = () => {
    dispatch(reduxLogout());
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const isAdmin = user?.role === "ADMIN" || user?.email?.includes("admin");

  const backToHomeLink = isAuthenticated
    ? isAdmin
      ? "/admin/dashboard"
      : "/dashboard"
    : "/";

  // Cleanup timeouts
  useEffect(() => {
    const loanTimeout = loanTimeoutRef.current;
    const userTimeout = userTimeoutRef.current;

    return () => {
      if (loanTimeout) clearTimeout(loanTimeout);
      if (userTimeout) clearTimeout(userTimeout);
    };
  }, []);

  // Dropdown handlers
  const handleDropdownEnter = (setter, ref) => {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = null;
    }
    setter(true);
  };

  const handleDropdownLeave = (setter, ref) => {
    ref.current = setTimeout(() => {
      setter(false);
    }, 200);
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="block text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-4 py-3 hover:bg-blue-50 rounded-md"
    >
      {children}
    </Link>
  );

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={backToHomeLink} className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Bank Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              BankMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && user ? (
              <>
                {isAdmin ? (
                  <>
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink to="/admin/manage-users">Manage Users</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/accounts">Accounts</NavLink>

                    {/* Loans Dropdown */}
                    <div
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(setIsLoanDropdownOpen, loanTimeoutRef)}
                      onMouseLeave={() => handleDropdownLeave(setIsLoanDropdownOpen, loanTimeoutRef)}
                    >
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                        Loans <FaChevronDown size={12} />
                      </button>

                      {isLoanDropdownOpen && (
                        <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1 transform origin-top-left transition-all duration-200">
                          <Link to="/loan/apply/home" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Home Loan</Link>
                          <Link to="/loan/apply/car" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Car Loan</Link>
                          <Link to="/loan/apply" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Personal Loan</Link>
                          <Link to="/loan/apply/education" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Education Loan</Link>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <Link to="/loan/status" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Loan Status</Link>
                          <Link to="/loan-history" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">Loan History</Link>
                        </div>
                      )}
                    </div>

                    <NavLink to="/transfer">Transfer</NavLink>
                  </>
                )}

                {/* User Profile Dropdown */}
                <div
                  className="relative ml-4"
                  onMouseEnter={() => handleDropdownEnter(setIsUserDropdownOpen, userTimeoutRef)}
                  onMouseLeave={() => handleDropdownLeave(setIsUserDropdownOpen, userTimeoutRef)}
                >
                  <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                    <div className="text-right hidden lg:block">
                      <p className="text-sm font-semibold">{user.firstName}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
                    </div>
                    <FaUserCircle className="text-4xl text-gray-400 hover:text-blue-500 transition-colors" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-2 transform origin-top-right transition-all duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      {!isAdmin && (
                        <Link to="/profile" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          Profile Settings
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Open Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-3 mb-2 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {isAdmin ? (
                  <>
                    <MobileNavLink to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                    <MobileNavLink to="/admin/manage-users" onClick={() => setIsMobileMenuOpen(false)}>Manage Users</MobileNavLink>
                  </>
                ) : (
                  <>
                    <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                    <MobileNavLink to="/accounts" onClick={() => setIsMobileMenuOpen(false)}>Accounts</MobileNavLink>
                    <MobileNavLink to="/transfer" onClick={() => setIsMobileMenuOpen(false)}>Transfer</MobileNavLink>
                    <MobileNavLink to="/loan" onClick={() => setIsMobileMenuOpen(false)}>Loans</MobileNavLink>
                    <MobileNavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</MobileNavLink>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-gray-600 font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
                >
                  Open Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
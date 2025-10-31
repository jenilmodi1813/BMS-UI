import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout as reduxLogout } from "./redux/auth/auth.slice";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Components
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashBoard from "./pages/DashBoard/DashBoard";
import Profile from "./pages/Profile/Profile";
import Transfer from "./components/Transfer/Transfer";

// Loan Pages
import LoanLandingPage from "./pages/LandingPage/LoanLandingPage";
import LoanHistory from "./pages/Loan/LoanHistory";
import LoanStatus from "./pages/Loan/LoanStatus";
import HomeLoan from "./pages/LoanType/HomeLoan";
import EducationLoan from "./pages/LoanType/EducationLoan";
import SupportPage from "./pages/support/SupportPage";
import CarLoan from "./pages/LoanType/CarLoan.jsx";
import AccountForm from "./components/Account/AccountForm";
import Account from "./pages/Account/Account";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reduxLogout());
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Account Routes */}
          <Route path="/account" element={<Account />} />


          {/* Loan Routes */}
          <Route path="/loan" element={<LoanLandingPage />} />
          <Route path="/loan/apply/home" element={<HomeLoan />} />
          <Route path="/loan/apply/car" element={<CarLoan />} />
          <Route path="/loan/apply/education" element={<EducationLoan />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loan-history"
            element={
              <ProtectedRoute>
                <LoanHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loan/status"
            element={
              <ProtectedRoute>
                <LoanStatus />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loan/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        dispatch(loginSuccess(parsed));
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        localStorage.removeItem("auth");
      }
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col">
      <AppContent />
    </div>
  );
}

export default App;

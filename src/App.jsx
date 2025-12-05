import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout as reduxLogout } from "./redux/auth/auth.slice";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
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
import KycUpload from "./pages/Loan/KycUpload.jsx";

// Dashboard Pages
import Deposit from "./pages/Deposit/Deposit";
import Analytics from "./pages/Analytics/Analytics";
import AllTransactions from "./pages/Transactions/AllTransactions";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import UserDetail from "./pages/Admin/UserDetail";
import LoanManagement from "./pages/Admin/LoanManagement";
import LoanEvaluation from "./pages/Admin/LoanEvaluation";
import InterestRateManagement from "./pages/Admin/InterestRateManagement";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

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
          <Route path="/accounts" element={<Account />} />

          {/* Loan Routes */}
          <Route path="/loan" element={<LoanLandingPage />} />
          <Route path="/kyc-upload" element={<KycUpload />} />

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

          {/* Dashboard Features */}
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <AllTransactions />
              </ProtectedRoute>
            }
          />

          {/* admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/manage-users"
            element={
              <ProtectedAdminRoute>
                <ManageUsers />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users/:userId"
            element={
              <ProtectedAdminRoute>
                <UserDetail />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/loans"
            element={
              <ProtectedAdminRoute>
                <LoanManagement />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/loans/:loanId/evaluate"
            element={
              <ProtectedAdminRoute>
                <LoanEvaluation />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/interest-rates"
            element={
              <ProtectedAdminRoute>
                <InterestRateManagement />
              </ProtectedAdminRoute>
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

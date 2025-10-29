import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout as reduxLogout } from "./redux/auth/slice";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Components
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import LoanBar from "./components/Loan/LoanBar";

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
import LoanApplication from "./pages/Loan/LoanApplication";
import HomeLoan from "./pages/LoanType/HomeLoan";
import CarLoan from "./pages/LoanType/CarLoan";
import EducationLoan from "./pages/LoanType/EducationLoan";

// Logout Component
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
  const location = useLocation();
  const isLoanPage = location.pathname.startsWith("/loan");

  return (
    <>
      {isLoanPage ? <LoanBar /> : <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/profile" element={<Profile />} />

          {/* Loan Routes */}
          <Route path="/loan" element={<LoanLandingPage />} />
          <Route path="/loan/apply" element={<LoanApplication />} />
          <Route path="/loan/apply/home" element={<HomeLoan />} />
          <Route path="/loan/apply/car" element={<CarLoan />} />
          <Route path="/loan/apply/education" element={<EducationLoan />} />
          <Route
            path="/loan/status"
            element={
              <h1 className="text-center mt-10 text-2xl font-semibold">
                Loan Status Page
              </h1>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Toaster />
      </div>
      {!isLoanPage && <Footer />}
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

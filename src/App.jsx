// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import "./App.css";


// import LandingPage from "./pages/LandingPage/LandingPage";
// import Navbar2 from "./components/Navbar2/Navbar2";
// import Navbar1 from "./components/Navbar1/Navbar1";
// import Footer from "./components/Footer/Footer";
// import SignUp from "./pages/SignUp/SignUp";
// import Login from "./pages/Login/Login";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import Account from "./pages/Account/Account";
// import Profile from "./pages/Profile/Profile";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import Transfer from "./components/Transfer/Transfer";

// function App() {
//   // Manage login state (false = before login, true = after login)
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="bg-gray-100 w-[100%] box-border min-h-screen flex flex-col">
//       {/* Navbar: show based on login status */}
//       {isLogin ? <Navbar2 /> : <Navbar1 />}

//       {/* Main Content */}
//       <div className="flex-grow">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signUp" element={<SignUp />} />
//           <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/dashboard" element={<DashBoard />} />
//           <Route path="/dashboard" element={<DashBoard />} />
//           <Route path="/transfer" element={<Transfer />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar2 from "./components/Navbar2/Navbar2";
import Navbar1 from "./components/Navbar1/Navbar1";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Transfer from "./components/Transfer/Transfer";
import Logout from "./Logout/Logout";
import LoanApplication from "./pages/Loan/LoanApplication";
import LoanBar from "./components/Loan/LoanBar";
import LoanLandingPage from "./pages/LandingPage/LoanLandingPage";
import HomeLoan from "./pages/LoanType/HomeLoan";
import CarLoan from "./pages/LoanType/CarLoan";
import EducationLoan from "./pages/LoanType/EducationLoan";

function App() {
  const [isLogin, setIsLogin] = useState(
    () => localStorage.getItem("isLogin") === "true"
  );

  const location = useLocation();
  const isLoanPage = location.pathname.startsWith("/loan");

  return (
    <div className="bg-gray-100 w-full min-h-screen flex flex-col">
      {/* Conditional Navbar */}
      {isLoanPage ? <LoanBar /> : isLogin ? <Navbar2 setIsLogin={setIsLogin} /> : <Navbar1 />}

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/profile" element={<Profile />} />

          {/* Loan Routes */}
          <Route path="/loan" element={<LoanLandingPage />} /> {/* new landing page */}
          <Route path="/loan/apply" element={<LoanApplication />} />
          <Route path="/loan/apply/home" element={<HomeLoan />} />
          <Route path="/loan/apply/car" element={<CarLoan />} />
          <Route path="/loan/apply/education" element={<EducationLoan />} />
          <Route path="/loan/status" element={<h1 className="text-center mt-10 text-2xl font-semibold">Loan Status Page</h1>} />

          <Route path="/logout" element={<Logout setIsLogin={setIsLogin} />} />
        </Routes>
      </div>

      {/* Footer */}
      {!isLoanPage && <Footer />}
    </div>
  );
}

export default App;

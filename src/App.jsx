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
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem("isLogin") === "true");

  return (
    <div className="bg-gray-100 w-[100%] box-border min-h-screen flex flex-col">
      {/* Navbar */}
      {isLogin ? <Navbar2 setIsLogin={setIsLogin} /> : <Navbar1 />}

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/accounts" element={<ForgotPassword />} />
          {/* <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/transfer" element={<Transfer />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout setIsLogin={setIsLogin} />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

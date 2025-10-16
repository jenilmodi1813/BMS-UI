import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user info and login state
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");

    // Update App state
    setIsLogin(false);

    // Redirect to login page
    navigate("/login");
  }, []);

  return null; // No UI needed
};

export default Logout;

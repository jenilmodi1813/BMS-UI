import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // TODO: Replace with actual admin role check when backend is ready
  // For now, we'll assume a user with a specific email or role 'ADMIN' is an admin
  // Or we can just check if they are authenticated for this demo if no role exists yet
  const isAdmin = user?.role === "ADMIN" || user?.email?.includes("admin"); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;

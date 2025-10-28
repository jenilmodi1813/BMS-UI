import axiosInstance from "./axiosInstance";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/customers/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || error.message;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/customers/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || error.message;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/customers/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error.response?.data || error.message;
  }
};

// Change Password
export const changePassword = async (customerId, passwordData) => {
  try {
    const response = await axiosInstance.put(
      `/customers/${customerId}/change-password`, 
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error("Change password failed:", error);
    throw error.response?.data || error.message;
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/customers/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Forgot password failed:", error);
    throw error.response?.data || error.message;
  }
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axiosInstance.post("/customers/reset-password", { 
      token, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error.response?.data || error.message;
  }
};
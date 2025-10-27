import axiosInstance from "../api/axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error.response?.data || error.message;
  }
};

import axiosInstance from "../../api/axiosInstance";

// 🔹 Register API
export const registerUser = async (payload) => {
  const response = await axiosInstance.post("/customers/register", payload);
  return response.data;
};

// 🔹 Login API
export const loginUser = async (payload) => {
  const response = await axiosInstance.post("/customers/login", payload);
  return response.data;
};

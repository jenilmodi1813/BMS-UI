import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔸 Login API
export const loginUserApi = async (payload) => {
  const response = await api.post("/customers/login", payload);
  return response.data;
};

// 🔸 Register API
export const registerUserApi = async (payload) => {
  const response = await api.post("/customers/register", payload);
  return response.data;
};

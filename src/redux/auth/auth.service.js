import axios from "axios";
import { BASE_URL } from "../../config/api.config";

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const profileApi = axios.create({
  baseURL: `${BASE_URL}/profile`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUserApi = async (payload) => {
  const response = await authApi.post("/customers/login", payload);
  return response.data;
};

export const registerUserApi = async (payload) => {
  const response = await authApi.post("/customers/register", payload);
  return response.data;
};

export const fetchUserProfile = async (token) => {
  const response = await profileApi.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfile = async (token, updatedData) => {
  const response = await profileApi.put("/update", updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
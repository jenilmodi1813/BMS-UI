import axios from "axios";
import { BASE_URL } from "../../config/api.config";

const API_URL = `${BASE_URL}/profile`;

export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserProfile = async (token, updatedData) => {
  const response = await axios.put(`${API_URL}/update`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

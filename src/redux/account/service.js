import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/accounts";

export const accountService = {
  // Fetch all accounts for a specific CIF
  getAccountsByCif: async (cifNumber) => {
    const response = await axios.get(`${API_BASE_URL}/cif/${cifNumber}`);
    return response.data;
  },

  // Create new savings account
  createSavingsAccount: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/savings`, data);
    return response.data;
  },

  // Create new current account
  createCurrentAccount: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/current`, data);
    return response.data;
  },
};

import axiosInstance from "./axiosInstance";

// Get All Accounts
export const getAccounts = async () => {
  try {
    const response = await axiosInstance.get("/accounts");
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error.response?.data || error.message;
  }
};

// Get Account By ID
export const getAccountById = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error.response?.data || error.message;
  }
};

// Create Account
export const createAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post("/accounts", accountData);
    return response.data;
  } catch (error) {
    console.error("Account creation failed:", error);
    throw error.response?.data || error.message;
  }
};

// Get Account Balance
export const getAccountBalance = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}/balance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error.response?.data || error.message;
  }
};

// Get Account Statement
export const getAccountStatement = async (accountId, fromDate, toDate) => {
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}/statement`, {
      params: { fromDate, toDate }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statement:", error);
    throw error.response?.data || error.message;
  }
};

// Close Account
export const closeAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete(`/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Error closing account:", error);
    throw error.response?.data || error.message;
  }
};
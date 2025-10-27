import axiosInstance from "./axiosInstance";

// Get All Transactions
export const getTransactions = async (accountId, page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get("/transactions", {
      params: { accountId, page, size }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response?.data || error.message;
  }
};

// Get Transaction By ID
export const getTransactionById = async (transactionId) => {
  try {
    const response = await axiosInstance.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error.response?.data || error.message;
  }
};

// Fund Transfer
export const fundTransfer = async (transferData) => {
  try {
    const response = await axiosInstance.post("/transactions/transfer", transferData);
    return response.data;
  } catch (error) {
    console.error("Fund transfer failed:", error);
    throw error.response?.data || error.message;
  }
};

// Bill Payment
export const billPayment = async (billData) => {
  try {
    const response = await axiosInstance.post("/transactions/bill-payment", billData);
    return response.data;
  } catch (error) {
    console.error("Bill payment failed:", error);
    throw error.response?.data || error.message;
  }
};

// Get Transaction History
export const getTransactionHistory = async (accountId, filters = {}) => {
  try {
    const response = await axiosInstance.get(`/transactions/history/${accountId}`, {
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error.response?.data || error.message;
  }
};

// Get Recent Transactions
export const getRecentTransactions = async (accountId, limit = 5) => {
  try {
    const response = await axiosInstance.get("/transactions/recent", {
      params: { accountId, limit }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    throw error.response?.data || error.message;
  }
};
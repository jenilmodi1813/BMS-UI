import axios from "axios";
import { BASE_URL } from "../../../config/api.config";

const API_BASE = `${BASE_URL}/loans`;

/**
 * Utility function to sanitize payload data.
 * - Converts empty strings ("") → null
 * - Converts numeric strings → Numbers
 * - Recursively handles nested objects
 */
const sanitize = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      clean[key] = sanitize(value);
    } else if (value === "") {
      clean[key] = null;
    } else if (!isNaN(value) && value !== null && value !== "") {
      clean[key] = Number(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
};

/**
 * ✅ Apply for Car Loan
 */
export const applyCarLoan = async (loanData) => {
  try {
    const storedAuth = localStorage.getItem("auth");
    const user = storedAuth ? JSON.parse(storedAuth) : null;
    const customerId = user?.customer?.cifNumber || loanData.customerId || null;
    const payload = {
      ...loanData,
      customerId,
    };

    const sanitizedPayload = sanitize(payload);
    console.log('These method is getting called or not');

    console.log("Sending Car Loan Application Payload:", sanitizedPayload);

    const response = await axios.post(`${API_BASE}/apply`, sanitizedPayload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log('Response saga',response);

    console.log("Car Loan Application Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Car Loan Apply API Error:", error);
    throw error.response?.data || { message: "Something went wrong while applying for car loan" };
  }
};

/**
 * ✅ Get All Car Loans by CIF
 */
export const getCarLoansByCif = async (cifNumber) => {
  try {
    const response = await axios.get(`${API_BASE}/${cifNumber}/all`);
    console.log("Fetched Car Loans:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch car loan list:", error);
    throw error.response?.data || { message: "Failed to fetch car loan data" };
  }
};

/**
 * ✅ Get Single Car Loan History / Details by Loan ID
 */
export const getCarLoanHistoryById = async (loanId) => {
  try {
    const response = await axios.get(`${API_BASE}/${loanId}/detail`);
    console.log("Fetched Car Loan Details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch car loan detail:", error);
    throw error.response?.data || { message: "Failed to fetch car loan details" };
  }
};

export const carLoanService = {
  applyCarLoan,
  getCarLoansByCif,
  getCarLoanHistoryById,
};
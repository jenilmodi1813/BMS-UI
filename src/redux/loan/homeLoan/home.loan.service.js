import axios from "axios";
import { BASE_URL } from "../../../config/api.config";

const API_BASE = `${BASE_URL}/loans`;

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

export const applyLoan = async (loanData) => {
  try {
    const storedAuth = localStorage.getItem("auth");
    const user = storedAuth ? JSON.parse(storedAuth) : null;
    const customerId = user?.customer?.cifNumber || loanData.customerId || null;

    const payload = {
      ...loanData,
      customerId,
    };

    const sanitizedPayload = sanitize(payload);

    console.log(" Sending Loan Application Payload:", sanitizedPayload);

    const response = await axios.post(`${API_BASE}/apply`, sanitizedPayload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(" Loan Application Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Loan Apply API Error:", error);
    throw error.response?.data || { message: "Something went wrong while applying for loan" };
  }
};


export const getLoansByCif = async (cifNumber) => {
  try {
    const response = await axios.get(`${API_BASE}/${cifNumber}/all`);
    console.log("Fetched Loans:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch loan data" };
  }
};


export const getLoanHistoryById = async (loanId) => {
  try {
    const response = await axios.get(`${API_BASE}/${loanId}/detail`);
    console.log("Fetched Loan Details:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch loan data" };
  }
};
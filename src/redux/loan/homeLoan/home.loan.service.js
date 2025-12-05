import axiosInstance from "../../../api/axiosInstance";



const sanitize = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj !== "object") {
    if (typeof obj === "string" && obj !== "" && !isNaN(obj)) {
      return Number(obj);
    }
    if (obj === "") return null;
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitize(item));
  }

  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === "") {
      clean[key] = null;
    } else if (Array.isArray(value)) {
      clean[key] = value.map((item) => sanitize(item));
    } else if (typeof value === "object" && value !== null) {
      clean[key] = sanitize(value);
    } else if (typeof value === "string" && !isNaN(value) && value !== "") {
      clean[key] = Number(value);
    } else {
      clean[key] = value;
    }
  }

  return clean;
};

export const applyHomeLoan = async (loanData) => {
  console.log("Service: applyHomeLoan called", loanData);


  try {
    const storedAuth = localStorage.getItem("auth");
    const user = storedAuth ? JSON.parse(storedAuth) : null;
    const customerId = user?.customer?.cifNumber || loanData.customerId || null;

    const payload = { ...loanData, customerId };
    const sanitizedPayload = sanitize(payload);



    const response = await axiosInstance.post(`/loans/apply`, sanitizedPayload, {
      baseURL: "/api/v1", // Override baseURL to use Vite proxy
      headers: { "Content-Type": "application/json" },
    });


    return response.data;

  } catch (error) {
    console.error("Home Loan Apply API Error:", error);
    console.error("Error response:", error.response?.data);
    throw error.response?.data || { message: "Home loan application failed" };
  }
};


export const getHomeLoansByCif = async (cifNumber) => {
  try {
    const response = await axiosInstance.get(`/loans/${cifNumber}/all`, {
      baseURL: "/api/v1"
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch home loan list:", error);
    throw error.response?.data || { message: "Failed to fetch home loans" };
  }
};


export const getHomeLoanHistoryById = async (loanId) => {
  try {
    const response = await axiosInstance.get(`/loans/${loanId}/detail`, {
      baseURL: "/api/v1"
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch home loan details:", error);
    throw error.response?.data || { message: "Failed to fetch home loan details" };
  }
};

export const homeLoanService = {
  applyHomeLoan,
  getHomeLoansByCif,
  getHomeLoanHistoryById,
};

import axiosInstance from "./axiosInstance";

// Submit KYC
export const submitKYC = async (customerId, kycData) => {
  try {
    const response = await axiosInstance.post(`/kyc/${customerId}`, kycData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("KYC submission failed:", error);
    throw error.response?.data || error.message;
  }
};

// Get KYC Status
export const getKYCStatus = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/kyc/${customerId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching KYC status:", error);
    throw error.response?.data || error.message;
  }
};

// Upload KYC Documents
export const uploadKYCDocuments = async (customerId, formData) => {
  try {
    const response = await axiosInstance.post(
      `/kyc/${customerId}/documents`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Document upload failed:", error);
    throw error.response?.data || error.message;
  }
};

// Get KYC Details
export const getKYCDetails = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/kyc/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching KYC details:", error);
    throw error.response?.data || error.message;
  }
};
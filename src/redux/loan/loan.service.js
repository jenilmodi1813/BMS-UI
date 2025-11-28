import axiosInstance from "../../api/axiosInstance";

/**
 * Upload a document for a loan application.
 * @param {FormData} formData - The multipart form data containing the file and request JSON.
 * @returns {Promise<Object>} - The response data.
 */
export const uploadLoanDocument = async (formData) => {
    try {
        const response = await axiosInstance.post(`/loan-documents/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Loan document upload failed:", error);
        throw error.response?.data || error.message;
    }
};

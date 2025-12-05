import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
const DOC_SERVICE_URL = "/api/v1";

const getAuthHeader = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return {
        headers: {
            Authorization: `Bearer ${auth?.tokens?.accessToken}`,
        },
    };
};

export const getAllCustomers = async () => {
    const response = await axios.get(
        `${BASE_URL}/customers`,
        getAuthHeader()
    );
    return response.data;
};

export const getCustomerById = async (customerId) => {
    const response = await axios.get(
        `${BASE_URL}/customers/${customerId}`,
        getAuthHeader()
    );
    return response.data;
};

// Loan Management
export const getAllLoansByCif = async (cifNumber) => {
    const response = await axios.get(
        `${BASE_URL}/loans/${cifNumber}/all`,
        getAuthHeader()
    );
    return response.data;
};

export const getAllLoans = async () => {
    const response = await axios.get(
        `${BASE_URL}/loans/all`,
        getAuthHeader()
    );
    return response.data;
};

export const getLoanById = async (loanId) => {
    const response = await axios.get(
        `${BASE_URL}/loans/${loanId}/detail`,
        getAuthHeader()
    );
    return response.data;
};

export const getCustomerTimelyPaidEmiDetails = async (cifNumber) => {
    const response = await axios.get(
        `${BASE_URL}/loans/${cifNumber}/customer`,
        getAuthHeader()
    );
    return response.data;
};

// Loan Evaluation & Sanction
export const updateCarLoanEvaluation = async (loanId, data) => {
    const response = await axios.put(
        `${BASE_URL}/loans/${loanId}/car-evaluation`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const verifyEducationBackground = async (loanId, data) => {
    const response = await axios.put(
        `${BASE_URL}/loans/${loanId}/education-verify`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const verifyHomeProperty = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/loans/home/verify`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const sanctionHomeLoan = async (loanId, data) => {
    const response = await axios.post(
        `${BASE_URL}/loans/${loanId}/sanction`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const evaluateLoanApplication = async (loanId) => {
    const response = await axios.post(
        `${BASE_URL}/loans/${loanId}/evaluate`,
        {},
        getAuthHeader()
    );
    return response.data;
};

// Loan Disbursal
export const disburseLoan = async (loanId) => {
    const response = await axios.post(
        `${BASE_URL}/loans/${loanId}/disburse`,
        {},
        getAuthHeader()
    );
    return response.data;
};

// Interest Rate Management
export const updateInterestRate = async (id, data) => {
    const response = await axios.put(
        `/api/interest-rates/${id}`,
        data,
        getAuthHeader()
    );
    return response.data;
};

export const deleteInterestRate = async (id) => {
    const response = await axios.delete(
        `/api/interest-rates/${id}`,
        getAuthHeader()
    );
    return response.data;
};

export const getAllInterestRates = async () => {
    // Assuming there's a GET endpoint for this, though not explicitly listed in the prompt, it's needed for the UI.
    // If not, we might need to mock it or ask. For now, I'll assume a standard REST pattern.
    const response = await axios.get(
        `/api/interest-rates`,
        getAuthHeader()
    );
    return response.data;
}


// Document Verification
// Customer KYC Verification
export const approveCustomerKyc = async (kycId) => {
    const response = await axios.patch(
        `${BASE_URL}/kyc/${kycId}/approve`,
        {},
        getAuthHeader()
    );
    return response.data;
};

export const rejectCustomerKyc = async (kycId) => {
    const response = await axios.patch(
        `${BASE_URL}/kyc/${kycId}/reject`,
        {},
        getAuthHeader()
    );
    return response.data;
};

// Document Verification
export const verifyDocument = async (documentId) => {
    const response = await axios.put(
        `${DOC_SERVICE_URL}/loan-documents/${documentId}/verify`,
        {},
        getAuthHeader()
    );
    return response.data;
};

export const rejectDocument = async (documentId) => {
    const response = await axios.put(
        `${DOC_SERVICE_URL}/loan-documents/${documentId}/reject`,
        {},
        getAuthHeader()
    );
    return response.data;
};

export const getKycDocumentDownloadUrl = (documentId) => {
    return `${DOC_SERVICE_URL}/loan-documents/${documentId}/download`;
};

export const downloadDocument = async (documentId) => {
    const response = await axios.get(
        `${DOC_SERVICE_URL}/loan-documents/${documentId}/download`,
        {
            ...getAuthHeader(),
            responseType: 'blob'
        }
    );
    return response.data;
};

export const getDocumentsByLoanId = async (loanApplicationId) => {
    const response = await axios.get(
        `${DOC_SERVICE_URL}/loan-documents/loan/${loanApplicationId}/documents`,
        getAuthHeader()
    );
    return response.data;
};

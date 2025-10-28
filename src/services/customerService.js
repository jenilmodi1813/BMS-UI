import axiosInstance from "../api/axiosInstance";

export const fetchCustomers = async () => {
  try {
    const response = await axiosInstance.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error.response?.data || error.message;
  }
};

export const updateCustomer = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error.response?.data || error.message;
  }
};

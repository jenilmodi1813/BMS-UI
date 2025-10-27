import axiosInstance from "./axiosInstance";

// Get All Customers
export const fetchCustomers = async () => {
  try {
    const response = await axiosInstance.get("/customers");
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error.response?.data || error.message;
  }
};

// Get Customer By ID
export const getCustomerById = async (id) => {
  try {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error.response?.data || error.message;
  }
};

// Get Customer By CIF Number
export const getCustomerByCIF = async (cifNumber) => {
  try {
    const response = await axiosInstance.get(`/customers/cif/${cifNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer by CIF:", error);
    throw error.response?.data || error.message;
  }
};

// Update Customer
export const updateCustomer = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error.response?.data || error.message;
  }
};

// Delete Customer
export const deleteCustomer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error.response?.data || error.message;
  }
};

// Get Customer Profile (current logged-in user)
export const getCustomerProfile = async () => {
  try {
    const response = await axiosInstance.get("/customers/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response?.data || error.message;
  }
};
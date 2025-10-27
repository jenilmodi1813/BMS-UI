import axios from "axios";
import { setCache, clearCache } from "../services/cacheService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any custom headers here if needed in future
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for caching GET requests (1 min)
axiosInstance.interceptors.response.use(
  async (response) => {
    const { config, data } = response;
    
    // Cache GET requests
    if (config.method === "get") {
      const key = config.url;
      setCache(key, data, 60); // 60 seconds
    }
    
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// Clear cache on mutation requests
["post", "put", "patch", "delete"].forEach((method) => {
  axiosInstance.interceptors.request.use((config) => {
    if (config.method === method) clearCache();
    return config;
  });
});

export default axiosInstance;
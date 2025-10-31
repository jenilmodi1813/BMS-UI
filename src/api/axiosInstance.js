import axios from "axios";
import { setCache, clearCache } from "../services/cacheService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("auth"));
    const token = storedUser?.tokens?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  async (response) => {
    const { config, data } = response;


    if (config.method === "get") {
      const key = config.url;
      setCache(key, data, 60); 
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - token invalid or expired");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

["post", "put", "patch", "delete"].forEach((method) => {
  axiosInstance.interceptors.request.use((config) => {
    if (config.method === method) clearCache();
    return config;
  });
});

export default axiosInstance;

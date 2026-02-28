import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (stored by zustand)
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("askmi_brand");
        if (storedData) {
          const parsed = JSON.parse(storedData);
          const token = parsed?.state?.token;
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error("Error reading token from localStorage:", error);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      // Handle 401 Unauthorized - clear token and redirect to login
      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("askmi_brand");
          // Optionally redirect to login page
          // window.location.href = "/auth/sign-in";
        }
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.error("Access forbidden");
      }
      
      // Handle 500 Internal Server Error
      if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

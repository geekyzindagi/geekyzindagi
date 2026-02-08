import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance with default config
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      // Handle forbidden
      console.error("Access forbidden");
    }

    if (error.response?.status === 500) {
      // Handle server errors
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const apiClient = {
  get: <T>(url: string, config = {}) => api.get<T>(url, config),
  post: <T>(url: string, data = {}, config = {}) =>
    api.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) =>
    api.put<T>(url, data, config),
  patch: <T>(url: string, data = {}, config = {}) =>
    api.patch<T>(url, data, config),
  delete: <T>(url: string, config = {}) => api.delete<T>(url, config),
};

export default api;

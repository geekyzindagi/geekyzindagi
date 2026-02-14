import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
                document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

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

export default apiClient;

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Required for Better Auth cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global auth errors (e.g. 401) here if needed
    return Promise.reject(error);
  }
);

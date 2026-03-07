import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuth } from "@/context/auth.context";
import { useEffect } from "react";
import { ApiResponse, AuthResponse } from "@/module/auth/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const useAxios = () => {
  const { clearAuth } = useAuth();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    // Response Interceptor for silent refresh
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refresh_token");

          if (refreshToken) {
            try {
              const { data } = await axios.post<ApiResponse<AuthResponse>>(
                `${API_URL}/auth/refresh`,
                {
                  refreshToken,
                },
              );

              const newAccessToken = data.data.accessToken;
              localStorage.setItem("access_token", newAccessToken);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              clearAuth();
              return Promise.reject(refreshError);
            }
          } else {
            clearAuth();
          }
        }
        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [clearAuth]);

  return axiosInstance;
};

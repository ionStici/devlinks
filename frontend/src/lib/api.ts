import axios from "axios";
import { tokenService } from "./access-token";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !isRefreshing &&
      !originalRequest._retry
    ) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;

        tokenService.setToken(accessToken);

        isRefreshing = false;

        return api(originalRequest);
      } catch {
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

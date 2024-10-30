import axios from 'axios';
import { env } from '@/config';
import { tokenService } from './access-token';

export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

// Attach the access token at each request
api.interceptors.request.use((config) => {
  const accessToken = tokenService.getToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Try to get a new access token at 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/refresh');
        const { accessToken } = response.data;
        tokenService.setToken(accessToken);
        return api(originalRequest); // Retry the original request
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface User {
  id: number;
  email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

const createTokenService = () => {
  let inMemoryToken: string | null = null;

  return {
    getToken: () => inMemoryToken,
    setToken: (token: string | null) => {
      console.log(token);
      inMemoryToken = token;

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }
    },
  };
};

const tokenService = createTokenService();

api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;

        tokenService.setToken(accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        tokenService.setToken(null);
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

//
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      tokenService.setToken(accessToken);
    } catch {
      tokenService.setToken(null);
      throw new Error("Authentication failed");
    }
  };

  const logout = async () => {
    api.post("/auth/refresh");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

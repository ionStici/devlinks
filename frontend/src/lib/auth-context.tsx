import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api";
import { tokenService } from "./access-token";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  isAuth: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;
        tokenService.setToken(accessToken);

        const userResponse = await api.get("/auth/me");
        setUser(userResponse.data);
        setIsAuth(true);
      } catch {
        tokenService.setToken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    return () => tokenService.setToken(null);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;
      tokenService.setToken(accessToken);

      const userResponse = await api.get("/auth/me");
      setUser(userResponse.data);
      setIsAuth(true);
    } catch {
      tokenService.setToken(null);
      throw new Error("Authentication Failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      tokenService.setToken(null);
      setUser(null);
      setIsAuth(false);
    } catch {
      throw new Error("Logout Failed");
    }
  };

  useEffect(() => {
    const handleTabClose = () => {
      tokenService.setToken(null);
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

import { type AuthContextType } from '@/types/auth-context';
import { type Credentials } from '@/types/credentials';
import { type User } from '@/types/user';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { tokenService } from './access-token';
import { api } from './api';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // INIT AUTH
  const initAuth = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      tokenService.setToken(response.data.accessToken);

      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
    } catch {
      tokenService.setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
    return () => tokenService.setToken(null);
  }, [initAuth]);

  // LOGIN
  const login = useCallback(async (credentials: Credentials) => {
    // await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await api.post('/auth/login', credentials);
      tokenService.setToken(response.data.accessToken);

      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
    } catch (error) {
      tokenService.setToken(null);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error('Authentication Failed');
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      await api.post('/auth/logout');
    } catch {
      throw new Error('Logout Failed');
    } finally {
      tokenService.setToken(null);
      setUser(null);
    }
  }, []);

  // REGISTER
  const register = useCallback(async (credentials: Credentials) => {
    try {
      const response = await api.post('/auth/register', credentials);
      tokenService.setToken(response.data.accessToken);

      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
    } catch (error) {
      tokenService.setToken(null);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error('Registration Failed');
    }
  }, []);

  // GET LOGGED IN USER
  const getUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw new Error('Operation Failed');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useUser must be used within AuthProvider');

  if (!context?.user) throw new Error('User is not authenticated');

  const { user, getUser } = context;

  return { user, getUser } as const;
}

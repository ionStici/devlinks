import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokenService } from '@/lib/access-token';
import { api } from '@/lib/api';
import { User } from '@/types/user';

interface AuthContextType {
  isAuth: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const userData = {
  email: 'john@email.com',
  username: 'f96444d2-98d8-49f6-99a1-1ab65b6c1501',
  name: 'Ion Stici',
  about: 'Full Stack Developer',
  image:
    'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  links: [
    'Website%https://ionstici.dev/',
    'GitHub%https://github.com/ionstici',
  ],
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await api.post('/auth/refresh');
        const { accessToken } = response.data;

        tokenService.setToken(accessToken);
        setUser(userData);
        setIsAuth(true);
      } catch {
        tokenService.setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();

    return () => tokenService.setToken(null);
  }, []);

  // LOGOUT
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken } = response.data;
      tokenService.setToken(accessToken);
      setIsAuth(true);
    } catch {
      tokenService.setToken(null);
      throw new Error('Authentication Failed');
    }
  };

  // LOGOUT
  const logout = async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
      tokenService.setToken(null);
      setIsAuth(false);
    } catch {
      throw new Error('Logout Failed');
    }
  };

  useEffect(() => {
    const handleTabClose = () => {
      tokenService.setToken(null);
    };

    window.addEventListener('beforeunload', handleTabClose);
    return () => window.removeEventListener('beforeunload', handleTabClose);
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

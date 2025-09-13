'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authApi } from '@/lib/api';
import { User, UserType } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = Cookies.get('access_token');
    if (token) {
      // In a real app, you would validate the token with the server
      // For now, we'll assume the token is valid if it exists
      const userData = Cookies.get('user_data');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          Cookies.remove('access_token');
          Cookies.remove('user_data');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const { access_token, user: userData } = response;
      
      Cookies.set('access_token', access_token);
      Cookies.set('user_data', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    try {
      const response = await authApi.register(email, password, name, userType);
      const { access_token, user: userData } = response;
      
      Cookies.set('access_token', access_token);
      Cookies.set('user_data', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const response = await authApi.googleLogin(token);
      const { access_token, user: userData } = response;
      
      Cookies.set('access_token', access_token);
      Cookies.set('user_data', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('user_data');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
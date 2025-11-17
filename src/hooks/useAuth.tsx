import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, LoginResponse } from '../api/auth';
import { emitToast } from '../utils/events';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = async (email: string, password: string) => {
    const resp = await authApi.login(email, password);
    if (resp.success && resp.data?.token) {
      setToken(resp.data.token);
      return true;
    } else {
      emitToast({ type: 'error', message: resp.message || 'Login failed' });
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    const resp = await authApi.register(email, password);
    if (resp.success) {
      emitToast({ type: 'success', message: 'Registration successful. Please log in.' });
      return true;
    } else {
      emitToast({ type: 'error', message: resp.message || 'Registration failed' });
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    emitToast({ type: 'info', message: 'Logged out' });
  };

  const value = useMemo<AuthContextValue>(() => ({ token, isAuthenticated: !!token, login, logout, register }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

import { apiClient } from './apiClient';
import { ApiResponse } from '../types/Competition';

export interface LoginResponse {
  token: string;
}

export const authApi = {
  register: async (email: string, password: string) => {
    return apiClient.post<{ success: boolean }>('/register', { email, password });
  },
  login: async (email: string, password: string) => {
    return apiClient.post<LoginResponse>('/login', { email, password });
  },
};

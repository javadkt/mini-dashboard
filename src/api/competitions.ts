import { apiClient } from './apiClient';
import { Competition, ApiResponse } from '../types/Competition';

export const competitionsApi = {
  list: async () => {
    return apiClient.get<Competition[]>('/competitions');
  },
  join: async (id: number) => {
    return apiClient.post<{ success: boolean }>(`/competitions/${id}/join`);
  },
};

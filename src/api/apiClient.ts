import { emitLoading } from '../utils/events';
import { mockFetch, MockRequest } from '../utils/mockApi';
import { ApiResponse } from '../types/Competition';

// Simple API client wrapper around mockFetch.
// Replace mockFetch with window.fetch or axios when backend is ready.

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(config: MockRequest): Promise<ApiResponse<T>> {
  emitLoading(true);
  try {
    const headers = { ...config.headers, ...getAuthHeader() } as Record<string, string | undefined>;
    const res = await mockFetch<T>({ ...config, headers });
    return res;
  } finally {
    emitLoading(false);
  }
}

export const apiClient = {
  get: <T>(url: string, headers?: Record<string, string>) => request<T>({ url, method: 'GET', headers }),
  post: <T>(url: string, body?: any, headers?: Record<string, string>) =>
    request<T>({ url, method: 'POST', body, headers }),
};

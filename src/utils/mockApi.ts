// Simple in-memory mock API to simulate backend endpoints.
// Replace with real HTTP calls later.

import { Competition, ApiResponse } from '../types/Competition';

// Simulated DB
let users: { email: string; password: string }[] = [
  { email: 'demo@demo.com', password: 'demo123' },
];
let competitions: Competition[] = [
  { id: 1, name: 'Weekly Crypto Contest', entryFee: 10, prizePool: 500, participants: 42 },
  { id: 2, name: 'Pro Trader League', entryFee: 25, prizePool: 1200, participants: 67 },
  { id: 3, name: 'Altcoin Sprint', entryFee: 15, prizePool: 800, participants: 51 },
  { id: 4, name: 'DeFi Masters Cup', entryFee: 50, prizePool: 3000, participants: 23 },
];

// token -> set of joined competition ids
const joinedByToken: Record<string, Set<number>> = {};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type HttpMethod = 'GET' | 'POST';

export interface MockRequest {
  url: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string | undefined>;
}

export async function mockFetch<T = any>(req: MockRequest): Promise<ApiResponse<T>> {
  const { url, method = 'GET', body, headers = {} } = req;
  // simulate network latency
  await delay(350);

  try {
    // Auth endpoints
    if (method === 'POST' && url === '/register') {
      const { email, password } = body || {};
      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }
      const exists = users.some((u) => u.email === email);
      if (exists) {
        return { success: false, message: 'User already exists' };
      }
      users.push({ email, password });
      return { success: true, data: { success: true } as unknown as T };
    }

    if (method === 'POST' && url === '/login') {
      const { email, password } = body || {};
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        return { success: false, message: 'Invalid credentials' };
      }
      const token = 'mock-jwt-token-' + btoa(email);
      if (!joinedByToken[token]) joinedByToken[token] = new Set<number>();
      return { success: true, data: { token } as unknown as T };
    }

    // Competitions list
    if (method === 'GET' && url === '/competitions') {
      const token = extractToken(headers);
      const joined = token ? joinedByToken[token] || new Set<number>() : new Set<number>();
      const data = competitions.map((c) => ({ ...c, joined: joined.has(c.id) }));
      return { success: true, data: data as unknown as T };
    }

    // Join competition
    if (method === 'POST' && url.startsWith('/competitions/') && url.endsWith('/join')) {
      const token = extractToken(headers);
      if (!token) {
        return { success: false, message: 'Unauthorized' };
      }
      const idStr = url.split('/')[2];
      const compId = Number(idStr);
      const comp = competitions.find((c) => c.id === compId);
      if (!comp) {
        return { success: false, message: 'Competition not found' };
      }
      const joined = joinedByToken[token] || (joinedByToken[token] = new Set<number>());
      if (joined.has(compId)) {
        return { success: false, message: 'Already joined' };
      }
      joined.add(compId);
      // Optionally update participants count
      comp.participants += 1;
      return { success: true, data: { success: true } as unknown as T };
    }

    return { success: false, message: 'Endpoint not found: ' + method + ' ' + url };
  } catch (e: any) {
    return { success: false, message: e?.message || 'Unknown error' };
  }
}

function extractToken(headers: Record<string, string | undefined>): string | null {
  const auth = headers['Authorization'] || headers['authorization'];
  if (!auth) return null;
  const parts = auth.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  return null;
}

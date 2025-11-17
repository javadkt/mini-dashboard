export interface Competition {
  id: number;
  name: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  joined?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

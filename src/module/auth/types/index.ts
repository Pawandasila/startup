import { User } from "@/module/user/types";

export type { User };

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface ApiError {
  status_code: number;
  message: string;
  data: {
    errorCode?: string;
  };
}

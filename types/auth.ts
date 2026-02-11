/**
 * Core authentication types for the admin dashboard
 * These match the backend API response structure
 */

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SUPPORT = 'SUPPORT',
  USER = 'USER',
}

export interface User {
  userId: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  gender?: string;
  status: UserStatus;
  role?: UserRole;
  avatar?: string;
}

export interface SignInCredentials {
  email: string;  // Can be email or phone number
  password: string;
}

// Backend response structure - all fields are at the top level
export interface AuthUserData {
  userId: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  gender?: string;
  status: UserStatus;
  role?: UserRole;
  image?: string | null;
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  data: AuthUserData;
  timestamp: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
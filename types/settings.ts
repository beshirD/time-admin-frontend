/**
 * Settings and user profile types
 */

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'PENDING';

export interface UserRole {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  descriptionOptional?: string;
}

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  countryCode?: string;
  password?: string;
  dateOfBirth?: string;
  gender?: Gender;
  language?: string;
  roles?: UserRole[];
  timezone?: string;
  image?: string | null;
  socialLoginId?: string | null;
  socialProvider?: string | null;
  isSocial?: boolean;
  status: UserStatus;
  lastLoginAt?: string | null;
  pointsBalance?: number;
  referralCode?: string;
  referredByUserId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  documents?: unknown[];
  address?: unknown | null;
  fullName?: string;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface UpdateUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
  gender: Gender;
  language: string;
  timezone: string;
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
  data: CurrentUser;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

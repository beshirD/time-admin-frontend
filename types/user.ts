/**
 * User management types based on the backend API
 */

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED' | 'PENDING';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type RoleName = 'ADMIN' | 'CUSTOMER' | 'DRIVER' | 'RESTAURANT_OWNER' | 'USER';

export interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  contactNo: string;
  roleName: RoleName;
  status: UserStatus;
  createdOn: string;
  createdBy: number | null;
  createdByName: string;
  totalOrders: number | null;
  totalSpent: number | null;
  lastLoginAt: string | null;
  hasActiveSession: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface DetailedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  dateOfBirth: string;
  gender: Gender;
  language: string;
  role: Role;
  timezone: string;
  status: UserStatus;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  documentCount: number;
  addressCount: number;
  hasActiveSession: boolean;
  lastActivityAt: string | null;
}

export interface ActivitySummary {
  totalLogins: number;
  totalDocuments: number;
  totalAddresses: number;
  firstLogin: string | null;
  lastLogin: string | null;
  currentlyActive: boolean;
  activityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UserDetailsData {
  user: DetailedUser;
  documents: unknown[];
  addresses: unknown[];
  activitySummary: ActivitySummary;
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: UserDetailsData;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: PaginatedResponse<AdminUser>;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface AdminUsersQueryParams {
  roleName?: RoleName;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  status?: UserStatus;
}

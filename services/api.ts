/**
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '@/types/api';

// Placeholder - will be replaced with actual API URL from env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/proxy'

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - tokens are now in httpOnly cookies
    // The browser automatically sends cookies with requests
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Cookies are automatically included by the browser
        // No need to manually attach Authorization header
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle token refresh and errors
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiErrorResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 - Unauthorized (token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshAccessToken();
            // Retry the original request (cookies will be updated automatically)
            return this.api(originalRequest);
          } catch (refreshError) {
            // Refresh failed - redirect to login
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  // Token management removed - now using httpOnly cookies only
  // Tokens are managed by server actions in lib/auth-cookies.ts

  private async refreshAccessToken(): Promise<void> {
    try {
      // Call refresh endpoint - cookies are sent automatically
      await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
        withCredentials: true, // Ensure cookies are sent
      });
      // New tokens are set in cookies by the server
    } catch {
      // Refresh failed
      throw new Error('Token refresh failed');
    }
  }

  private handleAuthFailure(): void {
    // Tokens are now in httpOnly cookies, cleared by server
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }



  private normalizeError(error: AxiosError<ApiErrorResponse>): ApiErrorResponse {
    if (error.response?.data) {
      return error.response.data;
    }

    // Network or other errors
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error.message || 'An unexpected error occurred',
      },
    };
  }

  // Public API getter
  getInstance(): AxiosInstance {
    return this.api;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export const api = apiService.getInstance();
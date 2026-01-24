/**
 * Authentication service for login, logout, and session management
 */

import { api } from './api';
import { setAuthCookie } from '@/lib/auth-cookies';

import { 
  SignInCredentials, 
  SignInResponse, 
  User,
  RefreshTokenResponse,
  AuthUserData 
} from '@/types/auth';
import { removeAuthCookie } from '@/lib/auth-cookies';

class AuthService {
  /**
   * Sign in admin user
   */
  async signIn(credentials: SignInCredentials): Promise<AuthUserData> {
    try {
      // Backend endpoint: /auth/login
      const response = await api.post<SignInResponse>(
        '/auth/login',
        credentials
      );

      if (response.data.success && response.data.data) {
        const authData = response.data.data;
        
        // Store tokens in localStorage
        if (authData.accessToken && authData.refreshToken) {
          this.setTokens(authData.accessToken, authData.refreshToken);
        }
        
        return authData;
      }

      throw new Error(response.data.message || 'Sign in failed');
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out admin user
   */
  async signOut(): Promise<void> {
    try {
      // Notify backend of logout
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore errors on logout
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
      
      // Remove auth cookie for middleware
      await removeAuthCookie();
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const accessToken = this.getAccessToken();
      
      if (!accessToken) {
        return null;
      }

      // Backend endpoint: /auth/me
      const response = await api.get<{
        success: boolean;
        message: string;
        data: User;
      }>('/auth/me');

      if (response.data.success) {
        return response.data.data;
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        return null;
      }

      // Backend endpoint: /auth/refresh-token (sends refresh token in Authorization header)
      const response = await api.post<RefreshTokenResponse>(
        '/auth/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        this.setTokens(accessToken, newRefreshToken);
              
        await setAuthCookie(accessToken);

        return accessToken;
      }

      return null;
    } catch {
      this.clearTokens();
      await removeAuthCookie();
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Token management helpers
  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setAccessToken(accessToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  }

  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleAuthError(error: any): Error {
    // Backend returns error in this format: { success: false, message: "error message" }
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    
    if (error.response?.data?.error) {
      return new Error(error.response.data.error.message);
    }
    
    return new Error(error.message || 'Authentication failed');
  }
}

// Export singleton instance
export const authService = new AuthService();
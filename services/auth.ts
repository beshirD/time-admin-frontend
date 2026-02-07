/**
 * Authentication service for login, logout, and session management
 * Now uses httpOnly cookies only (no localStorage)
 */

import { api } from './api';
import { setAuthCookie, setRefreshCookie, removeAuthCookie, removeRefreshCookie } from '@/lib/auth-cookies';

import { 
  SignInCredentials, 
  SignInResponse, 
  User,
  RefreshTokenResponse,
  AuthUserData 
} from '@/types/auth';

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
        
        // Store tokens in httpOnly cookies only
        if (authData.accessToken && authData.refreshToken) {
          await setAuthCookie(authData.accessToken);
          await setRefreshCookie(authData.refreshToken);
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
      // Remove auth cookies
      await removeAuthCookie();
      await removeRefreshCookie();
      
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
   * Note: This is now handled by the API client automatically
   */
  async refreshToken(): Promise<string | null> {
    try {
      // Backend endpoint: /auth/refresh-token
      const response = await api.post<RefreshTokenResponse>(
        '/auth/refresh-token',
        {}
      );

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        
        // Update cookies with new tokens
        await setAuthCookie(accessToken);
        await setRefreshCookie(newRefreshToken);

        return accessToken;
      }

      return null;
    } catch {
      await removeAuthCookie();
      await removeRefreshCookie();
      return null;
    }
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
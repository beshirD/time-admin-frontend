'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { setAuthCookie, setRefreshCookie, setUserIdCookie, removeAuthCookie, removeRefreshCookie, removeUserIdCookie } from '@/lib/auth-cookies';
import { useRouter } from 'next/navigation';
import type { User, AuthUserData, SignInResponse } from '@/types/auth';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

/**
 * Hook for signing in
 */
export function useSignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const response = await api.post<SignInResponse>('/auth/login', credentials);
      return response.data; // Extract data from response (AuthUserData - flat structure)
    },
    onSuccess: async (data: AuthUserData) => {
      // Store tokens in httpOnly cookies
      await setAuthCookie(data.accessToken);
      await setRefreshCookie(data.refreshToken);
      
      // Store userId in client-accessible cookie
      await setUserIdCookie(data.userId);

      // Cache the user data (convert AuthUserData to User format)
      const user: User = {
        userId: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        gender: data.gender,
        status: data.status,
        role: data.role,
        avatar: data.image || undefined,
      };
      queryClient.setQueryData(['currentUser'], user);

      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

/**
 * Hook for signing out
 */
export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Always succeed - we'll clear cookies regardless
      // The backend logout call is optional
      try {
        await api.post('/auth/logout');
      } catch (error) {
        // Silently ignore errors - user might not be authenticated
        // or the backend might be unreachable
        console.log('Logout API call failed (this is okay):', error);
      }
    },
    onSettled: async () => {
      // Clear tokens regardless of API call success
      await removeAuthCookie();
      await removeRefreshCookie();
      await removeUserIdCookie();

      // Clear all queries
      queryClient.clear();

      // Redirect to login
      router.push('/login');
    },
  });
}

/**
 * Hook for getting current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const response = await api.get<UserResponse>('/auth/me');
        return response.data; // Extract user from response
      } catch {
        // Return null if user is not authenticated instead of throwing
        // This prevents React Query from showing "Query data cannot be undefined" error
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if unauthorized
  });
}

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { setAuthCookie, setRefreshCookie, removeAuthCookie, removeRefreshCookie } from '@/lib/auth-cookies';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/auth';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthUserData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * Hook for signing in
 */
export function useSignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const data = await api.post<AuthUserData>('/auth/login', credentials);
      return data;
    },
    onSuccess: async (data) => {
      // Store tokens in httpOnly cookies
      await setAuthCookie(data.accessToken);
      await setRefreshCookie(data.refreshToken);

      // Cache the user data
      queryClient.setQueryData(['currentUser'], data.user);

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
      const user = await api.get<User>('/auth/me');
      return user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if unauthorized
  });
}

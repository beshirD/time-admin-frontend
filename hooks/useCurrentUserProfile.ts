'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { CurrentUser, UpdateUserProfile, UpdateUserProfileResponse } from '@/types/settings';
import type { UserDetailsResponse } from '@/types/user';

/**
 * Helper to get userId from cookie on the client side.
 * The 'userId' cookie is set at login and is NOT httpOnly, so JS can read it.
 */
function getUserIdFromCookie(): number | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)userId=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Hook for fetching current user profile.
 * Uses GET /api/user/admin/users/details/{userId} which returns the full
 * user object including the role as an object { id, name } matching the
 * CurrentUser type used by ProfileHeader/ProfileInfo components.
 *
 * Note: /auth/me returns role as a plain string enum which breaks user.role.name
 * access in the profile components.
 */
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      const userId = getUserIdFromCookie();
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      const response = await api.get<UserDetailsResponse>(
        `/api/user/admin/users/details/${userId}`
      );
      // DetailedUser has the same shape as CurrentUser for all fields the
      // profile components use (firstName, lastName, email, role.name, etc.)
      return response.data.user as unknown as CurrentUser;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook for updating user profile via PUT /api/user/admin/users/{userId}
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserProfile) => {
      const userId = getUserIdFromCookie();
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      const response = await api.put<UpdateUserProfileResponse>(
        `/api/user/admin/users/${userId}`,
        data
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Profile updated successfully');
      // Refetch fresh data from backend
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
}

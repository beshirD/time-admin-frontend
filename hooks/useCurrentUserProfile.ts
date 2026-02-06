'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { CurrentUserResponse, UpdateUserProfile, UpdateUserProfileResponse } from '@/types/settings';

/**
 * Hook for fetching current user profile
 */
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      const response = await api.get<CurrentUserResponse>('/api/user');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook for updating user profile
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserProfile) => {
      const response = await api.put<UpdateUserProfileResponse>('/api/user', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Update the cached user data
      queryClient.setQueryData(['currentUserProfile'], data);
      
      // Also invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

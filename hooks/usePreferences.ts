'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { PreferencesResponse, UpdatePreferences } from '@/types/preferences';

/**
 * Hook for fetching user preferences
 */
export function usePreferences() {
  return useQuery({
    queryKey: ['userPreferences'],
    queryFn: async () => {
      const response = await api.get<PreferencesResponse>('/api/profile/preferences');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for updating user preferences (PUT - full update)
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePreferences) => {
      const response = await api.put<PreferencesResponse>('/api/profile/preferences', data);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Preferences saved successfully');
      queryClient.setQueryData(['userPreferences'], response.data);
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save preferences');
    },
  });
}

/**
 * Hook for partially updating user preferences (PATCH)
 */
export function usePatchPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<UpdatePreferences>) => {
      const response = await api.patch<PreferencesResponse>('/api/profile/preferences', data);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Preferences saved successfully');
      queryClient.setQueryData(['userPreferences'], response.data);
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save preferences');
    },
  });
}

/**
 * Hook for deleting/resetting user preferences (DELETE)
 */
export function useDeletePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete<PreferencesResponse>('/api/profile/preferences');
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['userPreferences'], data);
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
    },
  });
}

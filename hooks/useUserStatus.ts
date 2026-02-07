'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';

interface UserStatusResponse {
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
}

interface StatusChangeRequest {
  reason: string;
  durationDays?: number;
  banUntil?: string;
  notifyUser: boolean;
  notificationMessage?: string;
}

/**
 * Hook for banning a user
 */
export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, details }: { userId: number; details: StatusChangeRequest }) => {
      const response = await api.post<UserStatusResponse>(
        `/api/user/admin/users/${userId}/ban`,
        details
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'User banned successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to ban user';
      toast.error(errorMessage);
    },
  });
}

/**
 * Hook for unbanning a user
 */
export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, details }: { userId: number; details: StatusChangeRequest }) => {
      const response = await api.post<UserStatusResponse>(
        `/api/user/admin/users/${userId}/unban`,
        details
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'User unbanned successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to unban user';
      toast.error(errorMessage);
    },
  });
}

/**
 * Hook for activating a user
 */
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, details }: { userId: number; details: StatusChangeRequest }) => {
      const response = await api.post<UserStatusResponse>(
        `/api/user/admin/users/${userId}/activate`,
        details
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'User activated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to activate user';
      toast.error(errorMessage);
    },
  });
}

/**
 * Hook for deactivating a user
 */
export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, details }: { userId: number; details: StatusChangeRequest }) => {
      console.log('Deactivate API call:', {
        endpoint: `/api/user/admin/users/${userId}/deactivate`,
        body: details,
      });
      const response = await api.post<UserStatusResponse>(
        `/api/user/admin/users/${userId}/deactivate`,
        details
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'User deactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to deactivate user';
      toast.error(errorMessage);
    },
  });
}

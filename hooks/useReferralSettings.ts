'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type {
  PointsSettingsResponse,
  PointsSettingsHistoryResponse,
  UpdatePointsSettings,
} from '@/types/referral';

const QUERY_KEY = ['referralSettings'];
const HISTORY_QUERY_KEY = ['referralSettingsHistory'];

/**
 * Fetch current active points/referral settings
 * GET /auth/admin/points/settings
 */
export function useReferralSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await api.get<PointsSettingsResponse>(
        '/auth/admin/points/settings'
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

/**
 * Update points/referral settings
 * PUT /auth/admin/points/settings
 */
export function useUpdateReferralSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePointsSettings) => {
      const response = await api.put<PointsSettingsResponse>(
        '/auth/admin/points/settings',
        data
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Settings updated successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HISTORY_QUERY_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });
}

/**
 * Fetch full history of settings configurations
 * GET /auth/admin/points/settings/all
 */
export function useReferralSettingsHistory() {
  return useQuery({
    queryKey: HISTORY_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get<PointsSettingsHistoryResponse>(
        '/auth/admin/points/settings/all'
      );
      return response.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

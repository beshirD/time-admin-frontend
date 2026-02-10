'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { PermissionsResponse } from '@/types/rbac';

/**
 * Hook for fetching all available permissions
 */
export function usePermissions() {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const response = await api.get<PermissionsResponse>('/rbac/permissions');
      
      if (!response.data || !response.data.permissions) {
        console.error('Invalid response structure:', response);
        return [];
      }
      
      return response.data.permissions;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

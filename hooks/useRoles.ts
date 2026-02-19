'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { RolesResponse } from '@/types/rbac';

/**
 * Hook for fetching all available roles with their permissions
 */
export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await api.get<RolesResponse>('/rbac/roles');
      return response.data?.roles ?? [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false, // Don't retry on access denied
  });
}

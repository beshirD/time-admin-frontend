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
      try {
        const response = await api.get<RolesResponse>('/rbac/roles');
        
        if (!response.data || !response.data.roles) {
          console.error('Invalid response structure:', response);
          return [];
        }
        
        return response.data.roles;
      } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - roles don't change frequently
    refetchOnWindowFocus: false,
  });
}

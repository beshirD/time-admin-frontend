'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { AdminUsersResponse, AdminUsersQueryParams, UserDetailsResponse } from '@/types/user';

/**
 * Hook for fetching admin users with pagination
 */
export function useAdminUsers(params: AdminUsersQueryParams = {}) {
  const {
    roleName = 'ADMIN',
    pageNumber = 0,
    pageSize = 20,
    search,
    status,
  } = params;

  return useQuery({
    queryKey: ['adminUsers', { roleName, pageNumber, pageSize, search, status }],
    queryFn: async () => {
      // Build query string
      const queryParams = new URLSearchParams({
        roleName,
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      });

      if (search) queryParams.append('search', search);
      if (status) queryParams.append('status', status);

      const response = await api.get<AdminUsersResponse>(
        `/api/user/admin/users/list?${queryParams.toString()}`
      );

      // Return the paginated data from the response
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook for fetching a single admin user by ID with full details
 */
export function useAdminUser(userId: number | null) {
  return useQuery({
    queryKey: ['adminUser', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      
      const response = await api.get<UserDetailsResponse>(
        `/api/user/admin/users/details/${userId}`
      );
      
      // Return the full user details data
      return response.data;
    },
    enabled: !!userId, // Only run query if userId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

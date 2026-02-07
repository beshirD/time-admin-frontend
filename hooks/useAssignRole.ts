'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { AssignRoleRequest, AssignRoleResponse } from '@/types/rbac';

interface AssignRoleParams {
  userId: number;
  roleName: string;
}

/**
 * Hook for assigning a role to a user
 */
export function useAssignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleName }: AssignRoleParams) => {
      const response = await api.put<AssignRoleResponse>(
        `/rbac/users/${userId}/roles`,
        { roleName } as AssignRoleRequest
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Role assigned successfully');
      // Invalidate admin users query to refresh the table
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to assign role';
      toast.error(errorMessage);
    },
  });
}

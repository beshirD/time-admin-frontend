'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { CreateRoleRequest, CreateRoleResponse } from '@/types/rbac';

/**
 * Hook for creating a new role
 */
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateRoleRequest) => {
      const response = await api.post<CreateRoleResponse>(
        '/rbac/roles',
        request
      );
      return response; // Return full response, not just response.data
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Role created successfully');
      // Invalidate roles query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error: any) => {
      // ApiClientError instances have the message directly on the error object
      const errorMessage = error?.message || 'Failed to create role';
      
      // Check if it's a permission error
      if (errorMessage.includes('Permission') && errorMessage.includes('required')) {
        toast.error('Access Denied', {
          description: errorMessage,
          duration: 5000,
        });
      } else {
        toast.error(errorMessage);
      }
    },
  });
}

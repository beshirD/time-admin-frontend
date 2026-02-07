'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import type { CreatePermissionRequest, CreatePermissionResponse } from '@/types/rbac';

/**
 * Hook for creating a new permission
 */
export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreatePermissionRequest) => {
      const response = await api.post<CreatePermissionResponse>(
        '/rbac/permissions',
        request
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Permission created successfully');
      // Invalidate permissions query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
    onError: (error: { response?: { data?: { message?: string; status?: number } } }) => {
      const errorData = error?.response?.data;
      const errorMessage = errorData?.message || 'Failed to create permission';
      
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

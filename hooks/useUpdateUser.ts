'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';

interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
  statusCode: number | null;
  errorCode: string | null;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  countryCode?: string;
  dateOfBirth?: string;
  gender?: string;
  roleId?: number;
  timezone?: string;
  status?: string;
  language?: string;
}

/**
 * Hook for updating user information
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: { userId: number; data: UpdateUserRequest }) => {
      const response = await api.put<UpdateUserResponse>(
        `/api/user/admin/users/${userId}`,
        data
      );
      return response;
    },
    onSuccess: (response, variables) => {
      toast.success(response.message || 'User updated successfully');
      // Invalidate the specific user detail query
      queryClient.invalidateQueries({ queryKey: ['adminUser', variables.userId] });
      // Invalidate list queries to refresh the user list
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: Error) => {
      const errorMessage = error?.message || 'Failed to update user';
      toast.error(errorMessage);
    },
  });
}

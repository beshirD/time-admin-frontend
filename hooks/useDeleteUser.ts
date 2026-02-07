'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteUserResponse {
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
}

/**
 * Hook for deleting a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await api.delete<DeleteUserResponse>(
        `/api/user/admin/users/${userId}`
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      // Redirect to customers list after successful deletion
      router.push('/users/customers');
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to delete user';
      toast.error(errorMessage);
    },
  });
}

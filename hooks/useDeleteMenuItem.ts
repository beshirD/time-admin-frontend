'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteMenuItemResponse {
  success: boolean;
  message: string;
}

/**
 * Hook for deleting a menu item
 */
export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (menuItemId: number) => {
      const response = await fetch(`/api/proxy/api/v1/admin/menu-items/${menuItemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete menu item');
      }

      // 204 No Content doesn't have a body
      return { success: true, message: 'Menu item deleted successfully' };
    },
    onSuccess: (response) => {
      toast.success(response.message);
      // Invalidate menu items queries
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to delete menu item';
      toast.error(errorMessage);
    },
  });
}

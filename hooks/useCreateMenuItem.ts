'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuItem } from '@/types/entities';
import { toast } from 'sonner';

/**
 * Hook for creating a menu item
 */
export function useCreateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/proxy/api/v1/menu-items', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create menu item');
      }

      return response.json() as Promise<MenuItem>;
    },
    onSuccess: () => {
      toast.success('Menu item created successfully');
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to create menu item';
      toast.error(errorMessage);
    },
  });
}

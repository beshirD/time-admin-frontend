'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';

interface DeleteRestaurantResponse {
  success: boolean;
  message: string;
  data: unknown;
  timestamp: string;
}

/**
 * Hook for deleting a restaurant
 */
export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantId: string) => {
      const response = await api.delete<DeleteRestaurantResponse>(
        `/api/v1/restaurants/${restaurantId}`
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Restaurant deleted successfully');
      // Invalidate all restaurant-related queries
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to delete restaurant';
      toast.error(errorMessage);
    },
  });
}

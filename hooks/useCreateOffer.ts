'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RestaurantOffer } from '@/types/entities';
import { toast } from 'sonner';

/**
 * Hook for creating a restaurant offer
 */
export function useCreateOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/proxy/api/v1/admin/offers', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create offer');
      }

      return response.json() as Promise<RestaurantOffer>;
    },
    onSuccess: () => {
      toast.success('Offer created successfully');
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to create offer';
      toast.error(errorMessage);
    },
  });
}

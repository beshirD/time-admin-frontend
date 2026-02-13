'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RestaurantOffer } from '@/types/entities';
import { toast } from 'sonner';

/**
 * Hook for updating a restaurant offer
 */
export function useUpdateOffer(offerId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/proxy/api/v1/admin/offers/${offerId}`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // If there are validation errors, extract and format them
        if (errorData.validationErrors) {
          const validationMessages = Object.entries(errorData.validationErrors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          throw new Error(validationMessages);
        }
        
        throw new Error(errorData.message || 'Failed to update offer');
      }

      return response.json() as Promise<RestaurantOffer>;
    },
    onSuccess: () => {
      toast.success('Offer updated successfully');
      // Invalidate both the offers list and the specific offer detail
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['offer', offerId] });
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Failed to update offer';
      toast.error(errorMessage);
    },
  });
}

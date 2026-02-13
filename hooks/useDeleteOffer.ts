'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook for deleting a restaurant offer
 */
export function useDeleteOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offerId: number) => {
      const response = await fetch(`/api/proxy/api/v1/admin/offers/${offerId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete offer');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate offers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });
}

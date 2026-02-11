'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { CreateSubscriptionRequest, CreateSubscriptionResponse } from '@/types/entities';
import { toast } from 'sonner';

/**
 * Hook for creating a subscription
 */
export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ restaurantId, packageId }: { restaurantId: number; packageId: number }) => {
      const requestData: CreateSubscriptionRequest = {
        packageId,
      };

      const response = await api.post<CreateSubscriptionResponse>(
        `/api/v1/admin/restaurants/${restaurantId}/subscriptions`,
        requestData
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Subscription created successfully');
      // Invalidate subscriptions list if we had one
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
    onError: (error: Error) => {
      const errorMessage = error?.message || 'Failed to create subscription';
      toast.error(errorMessage);
    },
  });
}

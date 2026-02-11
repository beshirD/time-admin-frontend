'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CreateManualOrderRequest, CreateManualOrderResponse } from "@/types/entities";

/**
 * Hook for creating a manual order
 * @param adminUserId - The ID of the admin user creating the order
 */
export function useCreateManualOrder(adminUserId?: number) {
  const queryClient = useQueryClient();

  console.log('[useCreateManualOrder] Hook initialized with adminUserId:', adminUserId);

  const mutation = useMutation({
    mutationFn: async (orderData: CreateManualOrderRequest) => {
      console.log('[useCreateManualOrder] mutationFn called with adminUserId:', adminUserId);
      console.log('[useCreateManualOrder] orderData:', orderData);
      
      // Validate that we have an admin user ID
      if (!adminUserId) {
        console.error('[useCreateManualOrder] No adminUserId - throwing error');
        throw new Error("Admin user ID is required to create an order");
      }

      console.log('[useCreateManualOrder] Sending request with X-Admin-User-Id header:', adminUserId.toString());
      
      const response = await api.post<CreateManualOrderResponse>(
        "/api/admin/orders/manual",
        orderData,
        {
          headers: {
            "X-Admin-User-Id": adminUserId.toString(),
          },
        }
      );
      console.log('[useCreateManualOrder] Response received:', response);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate orders list to refetch with new order
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    createOrder: mutation.mutate,
    createOrderAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}

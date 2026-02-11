'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CreateManualOrderRequest, CreateManualOrderResponse } from "@/types/entities";

/**
 * Hook for creating a manual order
 */
export function useCreateManualOrder() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderData: CreateManualOrderRequest) => {
      // Get admin user ID from session/auth context
      // For now, using a placeholder - you'll need to get this from your auth context
      const adminUserId = 1; // TODO: Get from auth context

      const response = await api.post<CreateManualOrderResponse>(
        "/api/admin/orders/manual",
        orderData,
        {
          headers: {
            "X-Admin-User-Id": adminUserId.toString(),
          },
        }
      );
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

'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CreateManualOrderRequest, CreateManualOrderResponse } from "@/types/entities";
import { useCurrentUser } from "@/hooks/useAuth";

/**
 * Hook for creating a manual order
 */
export function useCreateManualOrder() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const mutation = useMutation({
    mutationFn: async (orderData: CreateManualOrderRequest) => {
      // Get admin user ID from auth context
      if (!currentUser?.userId) {
        throw new Error("User not authenticated");
      }

      const response = await api.post<CreateManualOrderResponse>(
        "/api/admin/orders/manual",
        orderData,
        {
          headers: {
            "X-Admin-User-Id": currentUser.userId.toString(),
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

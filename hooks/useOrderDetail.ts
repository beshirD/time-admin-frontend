'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { OrderDetailResponse } from "@/types/entities";

/**
 * Hook for fetching a single order's details by ID
 */
export function useOrderDetail(orderId: string | number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await api.get<OrderDetailResponse>(
        `/api/admin/orders/${orderId}`
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!orderId, // Only fetch if orderId is provided
  });

  return {
    order: data,
    isLoading,
    error,
  };
}

'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { OffersResponse } from "@/types/entities";

interface UseOffersParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  status?: "active" | "inactive";
}

/**
 * Hook for fetching restaurant offers
 */
export function useOffers({
  page = 0,
  size = 20,
  sortBy = "createdAt",
  direction = "DESC",
  status = "active",
}: UseOffersParams = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortBy,
    direction,
    status,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["offers", page, size, sortBy, direction, status],
    queryFn: async () => {
      const response = await api.get<OffersResponse>(
        `/api/v1/offers?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    offers: data?.content || [],
    pageInfo: data?.page,
    isLoading,
    error,
  };
}

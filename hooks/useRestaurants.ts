'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { RestaurantsResponse } from "@/types/entities";

interface UseRestaurantsParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
  searchQuery?: string;
  status?: "active" | "inactive" | "pending" | "approved" | "rejected" | "suspended";
  cuisineIds?: number[];
  categoryIds?: number[];
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  deliveryTimeMinutes?: number;
  discountType?: string;
  minDiscountValue?: number;
}

export function useRestaurants(params: UseRestaurantsParams = {}) {
  const {
    page = 0,
    size = 20,
    sortBy = "id",
    direction = "DESC",
    status = "approved",
    ...otherParams
  } = params;

  // Fetch restaurants
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        direction,
        ...(status && { status }),
      });

      // Add optional parameters
      if (otherParams.searchQuery) {
        queryParams.append("searchQuery", otherParams.searchQuery);
      }
      if (otherParams.cuisineIds) {
        otherParams.cuisineIds.forEach(id => queryParams.append("cuisineIds", id.toString()));
      }
      if (otherParams.categoryIds) {
        otherParams.categoryIds.forEach(id => queryParams.append("categoryIds", id.toString()));
      }
      if (otherParams.minRating !== undefined) {
        queryParams.append("minRating", otherParams.minRating.toString());
      }
      if (otherParams.minPrice !== undefined) {
        queryParams.append("minPrice", otherParams.minPrice.toString());
      }
      if (otherParams.maxPrice !== undefined) {
        queryParams.append("maxPrice", otherParams.maxPrice.toString());
      }
      if (otherParams.deliveryTimeMinutes !== undefined) {
        queryParams.append("deliveryTimeMinutes", otherParams.deliveryTimeMinutes.toString());
      }
      if (otherParams.discountType) {
        queryParams.append("discountType", otherParams.discountType);
      }
      if (otherParams.minDiscountValue !== undefined) {
        queryParams.append("minDiscountValue", otherParams.minDiscountValue.toString());
      }

      const response = await api.get<RestaurantsResponse>(
        `/api/v1/restaurants?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    data: data?.content || [],
    totalCount: data?.page?.totalElements || 0,
    totalPages: data?.page?.totalPages || 0,
    currentPage: data?.page?.number || 0,
    isLoading,
    error,
  };
}

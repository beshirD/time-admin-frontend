'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { MenuItemsResponse } from "@/types/entities";

interface UseMenuItemsParams {
  restaurantId: string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
}

export function useMenuItems({
  restaurantId,
  page = 0,
  size = 20,
  sortBy = "createdAt",
  direction = "DESC",
}: UseMenuItemsParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["menuItems", restaurantId, page, size, sortBy, direction],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        direction,
      });
      
      const response = await api.get<MenuItemsResponse>(
        `/api/v1/restaurants/${restaurantId}/menu-items?${queryParams.toString()}`
      );
      return response;
    },
    enabled: !!restaurantId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    menuItems: data?.content || [],
    pageInfo: data?.page,
    isLoading,
    error,
  };
}

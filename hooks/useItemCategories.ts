'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface ItemCategory {
  id: number;
  title: string;
  description: string;
  status: "active" | "inactive";
}

interface ItemCategoriesResponse {
  content: ItemCategory[];
  page?: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

/**
 * Hook for fetching item categories
 */
export function useItemCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: async () => {
      const response = await api.get<ItemCategoriesResponse>(
        '/api/v1/item-categories'
      );
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    categories: data?.content || [],
    isLoading,
    error,
  };
}

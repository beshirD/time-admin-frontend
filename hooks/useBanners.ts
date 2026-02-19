'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { BannersResponse, CreateBannerResponse } from '@/types/entities';
import { toast } from 'sonner';

interface UseBannersParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
}

/**
 * Hook for fetching active banners
 * Note: Fetches all active banners without pagination as per requirements
 */
export function useBanners(params: UseBannersParams = {}) {
  const {
    sortBy = "createdAt",
    direction = "DESC",
  } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["banners", sortBy, direction],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        sortBy,
        direction,
      });

      const response = await api.get<BannersResponse>(
        `/api/v1/ad/banners/active?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    banners: data?.content || [],
    pageInfo: data?.page,
    totalCount: data?.page?.totalElements || 0,
    isLoading,
    error,
  };
}

/**
 * Hook for creating a banner
 */
export function useCreateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ restaurantId, formData }: { restaurantId: number; formData: FormData }) => {
      const response = await fetch(`/api/proxy/api/v1/admin/restaurants/${restaurantId}/banners`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create banner');
      }

      return response.json() as Promise<CreateBannerResponse>;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Banner created successfully');
      // Invalidate banners list to refresh
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
    onError: (error: Error) => {
      const errorMessage = error?.message || 'Failed to create banner';
      toast.error(errorMessage);
    },
  });
}

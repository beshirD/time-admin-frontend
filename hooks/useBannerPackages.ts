'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { BannerPackagesResponse, CreateBannerPackageRequest, CreateBannerPackageResponse } from '@/types/entities';
import { toast } from 'sonner';

interface UseBannerPackagesParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
}

/**
 * Hook for fetching banner packages
 */
export function useBannerPackages(params: UseBannerPackagesParams = {}) {
  const {
    sortBy = "createdAt",
    direction = "DESC",
  } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["bannerPackages", sortBy, direction],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        sortBy,
        direction,
      });

      const response = await api.get<BannerPackagesResponse>(
        `/api/v1/ad/packages?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    packages: data?.content || [],
    pageInfo: data?.page,
    totalCount: data?.page?.totalElements || 0,
    isLoading,
    error,
  };
}

/**
 * Hook for creating a banner package
 */
export function useCreateBannerPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageData: CreateBannerPackageRequest) => {
      const response = await api.post<CreateBannerPackageResponse>(
        '/api/v1/admin/ad/packages',
        packageData
      );
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message || 'Banner package created successfully');
      // Invalidate packages list to refresh
      queryClient.invalidateQueries({ queryKey: ['bannerPackages'] });
    },
    onError: (error: Error) => {
      const errorMessage = error?.message || 'Failed to create banner package';
      toast.error(errorMessage);
    },
  });
}

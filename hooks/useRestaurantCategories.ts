'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiResponse } from "@/lib/api-client";
import { FoodCategoriesResponse } from "@/types/entities";
import { toast } from "sonner";

export function useRestaurantCategories() {
  const queryClient = useQueryClient();

  // Fetch restaurant categories
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant-categories"],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: "0",
        size: "100",
        sortBy: "id",
        direction: "DESC",
      });

      const response = await api.get<ApiResponse<FoodCategoriesResponse>>(
        `/api/v1/restaurant-categories?${queryParams.toString()}`
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.post<ApiResponse<unknown>>(
        "/api/v1/admin/restaurant-categories",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-categories"] });
      toast.success("Restaurant category created successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to create restaurant category");
      console.error(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await api.patch<ApiResponse<unknown>>(
        `/api/v1/admin/restaurant-categories/${id}`,
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-categories"] });
      toast.success("Restaurant category updated successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to update restaurant category");
      console.error(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/v1/admin/restaurant-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant-categories"] });
      toast.success("Restaurant category deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete restaurant category");
      console.error(error);
    },
  });

  return {
    data: data?.content || [],
    totalCount: data?.page?.totalElements || 0,
    isLoading,
    error,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

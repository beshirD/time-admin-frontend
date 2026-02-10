'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { AddOnCategoriesResponse } from "@/types/entities";
import { toast } from "sonner";

export function useAddOnCategories() {
  const queryClient = useQueryClient();

  // Fetch add-on categories
  const { data, isLoading, error } = useQuery({
    queryKey: ["addon-categories"],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: "0",
        size: "100",
        sortBy: "id",
        direction: "DESC",
      });

      const response = await api.get<AddOnCategoriesResponse>(
        `/api/v1/addon-categories?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: { title: string; status: string }) => {
      const response = await api.post(
        "/api/v1/admin/addon-categories",
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addon-categories"] });
      toast.success("Add-on category created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create add-on category");
      console.error(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title: string; status: string } }) => {
      const response = await api.patch(
        `/api/v1/admin/addon-categories/${id}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addon-categories"] });
      toast.success("Add-on category updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update add-on category");
      console.error(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/v1/admin/addon-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addon-categories"] });
      toast.success("Add-on category deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete add-on category");
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

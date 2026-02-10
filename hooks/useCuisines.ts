'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { CuisinesResponse } from "@/types/entities";
import { toast } from "sonner";

export function useCuisines() {
  const queryClient = useQueryClient();

  // Fetch cuisines
  const { data, isLoading, error } = useQuery({
    queryKey: ["cuisines"],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: "0",
        size: "100",
        sortBy: "id",
        direction: "DESC",
      });

      const response = await api.get<CuisinesResponse>(
        `/api/v1/cuisines?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/proxy/api/v1/admin/cuisines', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create cuisine');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
      toast.success("Cuisine created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create cuisine");
      console.error(error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await fetch(`/api/proxy/api/v1/admin/cuisines/${id}`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cuisine');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
      toast.success("Cuisine updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cuisine");
      console.error(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/v1/admin/cuisines/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cuisines"] });
      toast.success("Cuisine deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete cuisine");
      console.error(error);
    },
  });

  return {
    data: data?.content || [],
    totalCount: data?.page?.totalElements || 0,
    isLoading,
    error,
    createCuisine: createMutation.mutate,
    updateCuisine: updateMutation.mutate,
    deleteCuisine: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Restaurant } from "@/types/entities";
import { toast } from "sonner";

export function useRestaurantDetails(id: string) {
  const queryClient = useQueryClient();

  // Fetch restaurant details
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await api.get<Restaurant>(`/api/v1/restaurants/${id}`);
      return response;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/proxy/api/v1/restaurants/${id}`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update restaurant');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", id] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast.success("Restaurant updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update restaurant");
      console.error(error);
    },
  });

  return {
    restaurant: data,
    isLoading,
    error,
    updateRestaurant: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}

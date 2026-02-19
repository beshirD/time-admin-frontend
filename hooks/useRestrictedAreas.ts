'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { RestrictedArea } from '@/types/entities';
import { toast } from 'sonner';

interface RestrictedAreasListResponse {
  success: boolean;
  message: string;
  data: RestrictedArea[];
}

interface RestrictedAreaSingleResponse {
  success: boolean;
  message: string;
  data: RestrictedArea;
}

export interface CreateRestrictedAreaRequest {
  areaName: string;
  geoPolygon: string;
  startHour: string;
  endHour: string;
  status: 'active' | 'inactive';
}

export type UpdateRestrictedAreaRequest = Partial<CreateRestrictedAreaRequest>;

export function useRestrictedAreas() {
  const queryClient = useQueryClient();

  // Fetch all restricted areas
  const { data, isLoading, error } = useQuery({
    queryKey: ['restricted-areas'],
    queryFn: async () => {
      const response = await api.get<RestrictedAreasListResponse>('/orders/restricted-areas');
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateRestrictedAreaRequest) => {
      const response = await api.post<RestrictedAreaSingleResponse>(
        '/orders/restricted-areas',
        payload,
      );
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['restricted-areas'] });
      toast.success(response.message || 'Restricted area created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create restricted area');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateRestrictedAreaRequest;
    }) => {
      const response = await api.put<RestrictedAreaSingleResponse>(
        `/orders/restricted-areas/${id}`,
        payload,
      );
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['restricted-areas'] });
      toast.success(response.message || 'Restricted area updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update restricted area');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/orders/restricted-areas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restricted-areas'] });
      toast.success('Restricted area deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete restricted area');
    },
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
    createArea: createMutation.mutate,
    updateArea: updateMutation.mutate,
    deleteArea: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

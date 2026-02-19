'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { FAQ, FAQsResponse, UpdateFAQRequest } from '@/types/entities';
import { toast } from 'sonner';

interface FAQApiResponse {
  success: boolean;
  message: string;
  data: FAQsResponse;
}

interface FAQSingleResponse {
  success: boolean;
  message: string;
  data: FAQ;
}

export interface CreateFAQRequest {
  category: string;
  displayOrder: number;
  active: boolean;
  translations: Array<{
    languageCode: string;
    title: string;
    description: string;
    question: string;
    answer: string;
  }>;
}

export function useFAQs() {
  const queryClient = useQueryClient();

  // Fetch all FAQs
  const { data, isLoading, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const response = await api.get<FAQApiResponse>('/api/faqs');
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create FAQ mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateFAQRequest) => {
      const response = await api.post<FAQSingleResponse>('/api/faqs', payload);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success(response.message || 'FAQ created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create FAQ');
    },
  });

  // Update FAQ mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdateFAQRequest }) => {
      const response = await api.put<FAQSingleResponse>(`/api/faqs/${id}`, payload);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success(response.message || 'FAQ updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update FAQ');
    },
  });

  // Delete FAQ mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/faqs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      toast.success('FAQ deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete FAQ');
    },
  });

  return {
    data: data?.data?.content || [],
    totalCount: data?.data?.totalElements || 0,
    isLoading,
    error,
    createFAQ: createMutation.mutate,
    updateFAQ: updateMutation.mutate,
    deleteFAQ: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

// ─── FAQ Categories ───────────────────────────────────────────────────────────

interface FAQCategoriesResponse {
  success: boolean;
  message: string;
  data: string[];
}

export function useFAQCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ['faq-categories'],
    queryFn: async () => {
      const response = await api.get<FAQCategoriesResponse>('/api/faqs/categories');
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes — categories change rarely
  });

  return {
    categories: data?.data || [],
    isLoading,
  };
}


'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Transaction, TransactionsResponse, TransactionStatus } from '@/types/entities';
import { toast } from 'sonner';

interface TransactionsApiResponse {
  success: boolean;
  message: string;
  data: TransactionsResponse;
}

interface TransactionSingleResponse {
  success: boolean;
  message: string;
  data: Transaction;
}

interface UseTransactionsParams {
  page?: number;
  size?: number;
  payableType?: string;
  status?: string;
  gateway?: string;
  direction?: string;
}

export function useTransactions(params: UseTransactionsParams = {}) {
  const queryClient = useQueryClient();

  const { page = 0, size = 20, payableType, status, gateway, direction } = params;

  // Fetch transactions
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', page, size, payableType, status, gateway, direction],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.set('page', String(page));
      queryParams.set('size', String(size));
      if (payableType) queryParams.set('payableType', payableType);
      if (status) queryParams.set('status', status);
      if (gateway) queryParams.set('gateway', gateway);
      if (direction) queryParams.set('direction', direction);

      const response = await api.get<TransactionsApiResponse>(
        `/api/admin/transactions?${queryParams.toString()}`
      );
      return response;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  // Change transaction status
  const changeStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TransactionStatus }) => {
      const response = await api.patch<TransactionSingleResponse>(
        `/api/admin/transactions/${id}/status`,
        { status }
      );
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success(response.message || 'Transaction status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update transaction status');
    },
  });

  return {
    data: data?.data?.transactions || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 0,
    size: data?.data?.size || 20,
    isLoading,
    error,
    changeStatus: changeStatusMutation.mutate,
    isChangingStatus: changeStatusMutation.isPending,
  };
}

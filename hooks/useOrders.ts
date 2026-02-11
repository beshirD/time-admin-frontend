'use client';

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { OrdersResponse, OrderStatus, OrdersStatusResponse, PaymentStatus } from "@/types/entities";

interface UseOrdersParams {
  orderId?: number;
  orderNo?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  deliveryStatus?: string;
  restaurantId?: number;
  userId?: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
  datePreset?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

/**
 * Hook for fetching orders with filtering and pagination
 */
export function useOrders(params: UseOrdersParams = {}) {
  const {
    page = 0,
    size = 20,
    sortBy = "createdAt",
    sortDirection = "DESC",
    ...otherParams
  } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", params],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sortBy,
        sortDirection,
      });

      // Add optional parameters
      if (otherParams.orderId !== undefined) {
        queryParams.append("orderId", otherParams.orderId.toString());
      }
      if (otherParams.orderNo) {
        queryParams.append("orderNo", otherParams.orderNo);
      }
      if (otherParams.status) {
        queryParams.append("status", otherParams.status);
      }
      if (otherParams.paymentStatus) {
        queryParams.append("paymentStatus", otherParams.paymentStatus);
      }
      if (otherParams.deliveryStatus) {
        queryParams.append("deliveryStatus", otherParams.deliveryStatus);
      }
      if (otherParams.restaurantId !== undefined) {
        queryParams.append("restaurantId", otherParams.restaurantId.toString());
      }
      if (otherParams.userId !== undefined) {
        queryParams.append("userId", otherParams.userId.toString());
      }
      if (otherParams.search) {
        queryParams.append("search", otherParams.search);
      }
      if (otherParams.fromDate) {
        queryParams.append("fromDate", otherParams.fromDate);
      }
      if (otherParams.toDate) {
        queryParams.append("toDate", otherParams.toDate);
      }
      if (otherParams.datePreset) {
        queryParams.append("datePreset", otherParams.datePreset);
      }

      const url = `/api/admin/orders?${queryParams.toString()}`;
      const response = await api.get<{ success: boolean; message: string; data: OrdersResponse }>(url);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    orders: data?.orders || [],
    total: data?.total || 0,
    currentPage: data?.page || 0,
    pageSize: data?.size || 20,
    isLoading,
    error,
  };
}

interface UseOrdersStatsParams {
  search?: string;
  fromDate?: string;
  toDate?: string;
}

/**
 * Hook for fetching order statistics (counts per status)
 * Uses the dedicated /orders/status endpoint
 */
export function useOrdersStats(params: UseOrdersStatsParams = {}) {
  const { search, fromDate, toDate } = params;

  return useQuery({
    queryKey: ["orders-status-stats", search, fromDate, toDate],
    queryFn: async () => {
      // Build query params
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (fromDate) queryParams.append("fromDate", fromDate);
      if (toDate) queryParams.append("toDate", toDate);

      const response = await api.get<{ success: boolean; data: OrdersStatusResponse }>(
        `/orders/status?${queryParams.toString()}`
      );
      
      const groups = response.data || [];
      
      // Calculate counts from groups
      const getCount = (status: string) => {
        // Find group and handle case-insensitive match
        const group = groups.find(g => g.status?.toLowerCase() === status.toLowerCase());
        return group?.orders?.length || 0;
      };

      const pending = getCount("pending");
      const delivered = getCount("delivered");
      const cancelled = getCount("cancelled");
      
      // Sum all groups for total
      const total = groups.reduce((sum, group) => sum + (group.orders?.length || 0), 0);

      return {
        total,
        pending,
        delivered,
        cancelled,
      };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

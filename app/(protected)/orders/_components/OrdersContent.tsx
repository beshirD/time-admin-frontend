"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Order, OrderStatus } from "@/types/entities";
import OrdersHeader from "./OrdersHeader";
import OrdersMetrics from "./OrdersMetrics";
import OrdersFilters from "./OrdersFilters";
import OrdersTable from "@/components/orders/OrdersTable";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOrders, useOrdersStats } from "@/hooks/useOrders";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

interface OrdersContentProps {
  initialAdminUserId?: number;
}

export default function OrdersContent({
  initialAdminUserId,
}: OrdersContentProps) {
  const [adminUserId] = useState<number | undefined>(initialAdminUserId);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedMetricStatus, setSelectedMetricStatus] =
    useState<OrderStatus | null>(null);

  // Format dates for API
  const fromDate = dateRange?.from?.toISOString();
  const toDate = dateRange?.to?.toISOString();

  // Determine which status to use for API call
  const apiStatus =
    selectedMetricStatus ||
    (selectedStatuses.length === 1
      ? (selectedStatuses[0] as OrderStatus)
      : undefined);

  // Fetch orders with filters
  const { orders, isLoading, error } = useOrders({
    search: searchQuery || undefined,
    status: apiStatus,
    fromDate,
    toDate,
    page: 0,
    size: 20,
  });

  // Fetch stats for metrics (stays consistent)
  const { data: stats, isLoading: isStatsLoading } = useOrdersStats({
    search: searchQuery || undefined,
    fromDate,
    toDate,
    // Add userId if the stats endpoint supports it (assuming it does based on useOrders pattern)
  });

  // Handlers
  const handleView = (id: number) => {
    router.push(`/orders/${id}`);
  };

  const handleAddOrderManual = () => {
    router.push("/orders/create");
  };

  const handleInvoice = (id: number) => {
    toast.success(`Generating invoice for order ID: ${id}`);
  };

  const handleStatusToggle = (status: string) => {
    // Clear metric selection when using filter chips
    setSelectedMetricStatus(null);

    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleMetricClick = (status: OrderStatus | null) => {
    // Clear filter chips when using metric cards
    setSelectedStatuses([]);
    setSelectedMetricStatus(status);
  };

  // Filter orders client-side for multiple status selection
  const filteredOrders =
    selectedStatuses.length > 1
      ? orders.filter((order: Order) => selectedStatuses.includes(order.status))
      : orders;

  if (error) {
    return (
      <div className="flex flex-col gap-4 w-full pb-8">
        <OrdersHeader onAddOrderManual={handleAddOrderManual} />
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">
            Error loading orders. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full pb-8">
      {/* Header */}
      <OrdersHeader onAddOrderManual={handleAddOrderManual} />

      {/* Metrics */}
      <OrdersMetrics
        stats={stats}
        isLoading={isStatsLoading}
        selectedStatus={selectedMetricStatus}
        onStatusClick={handleMetricClick}
      />

      {/* Filters & Table */}
      <div className="bg-white py-6 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-800">
        <OrdersFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedStatuses={selectedStatuses}
          onStatusToggle={handleStatusToggle}
        />

        <div className="mt-4">
          {isLoading ? (
            <TableSkeleton
              rows={10}
              columns={7}
              showHeader={true}
            />
          ) : (
            <OrdersTable
              data={filteredOrders}
              variant="all"
              isLoading={isLoading}
              onView={handleView}
              onInvoice={handleInvoice}
            />
          )}
        </div>
      </div>
    </div>
  );
}

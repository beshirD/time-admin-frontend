"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { OrderStatus } from "@/types/entities";
import OrdersHeader from "./OrdersHeader";
import OrdersMetrics from "./OrdersMetrics";
import OrdersFilters from "./OrdersFilters";
import OrdersTable from "@/components/orders/OrdersTable";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/useOrders";

export default function OrdersContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Format dates for API
  const fromDate = dateRange?.from?.toISOString();
  const toDate = dateRange?.to?.toISOString();

  // Fetch orders with filters
  const { orders, isLoading, error } = useOrders({
    search: searchQuery || undefined,
    status:
      selectedStatuses.length === 1
        ? (selectedStatuses[0] as OrderStatus)
        : undefined,
    fromDate,
    toDate,
    page: 0,
    size: 20,
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
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  // Filter orders client-side for multiple status selection
  const filteredOrders =
    selectedStatuses.length > 1
      ? orders.filter((order) => selectedStatuses.includes(order.status))
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
      <OrdersMetrics orders={orders} />

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
          <OrdersTable
            data={filteredOrders}
            variant="all"
            onView={handleView}
            onInvoice={handleInvoice}
          />
        </div>
      </div>
    </div>
  );
}

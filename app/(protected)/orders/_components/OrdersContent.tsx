"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Order } from "@/types/entities";
import OrdersHeader from "./OrdersHeader";
import OrdersMetrics from "./OrdersMetrics";
import OrdersFilters from "./OrdersFilters";
import OrdersTable from "@/components/orders/OrdersTable";
import { mockOrders } from "./mockData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OrdersContent() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

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

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    // Search filter (Order No or Store)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !order.orderNo.toLowerCase().includes(query) &&
        !order.store.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      if (!selectedStatuses.includes(order.deliveryStatus)) {
        return false;
      }
    }

    // Date range filter
    if (dateRange?.from && dateRange?.to) {
      const [datePart] = order.createdOn.split(" ");
      const [day, monthStr, year] = datePart.split("-");
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      const month = monthMap[monthStr];
      const orderDate = new Date(parseInt(year), month, parseInt(day));

      if (orderDate < dateRange.from || orderDate > dateRange.to) {
        return false;
      }
    }

    return true;
  });

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

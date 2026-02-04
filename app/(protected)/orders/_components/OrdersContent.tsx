"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Order } from "@/types/entities";
import { createColumns } from "./columns";
import OrdersHeader from "./OrdersHeader";
import OrdersMetrics from "./OrdersMetrics";
import OrdersFilters from "./OrdersFilters";
import OrdersTable from "./OrdersTable";
import { mockOrders } from "./mockData";
import { toast } from "sonner";

export default function OrdersContent() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Handlers
  const handleView = (order: Order) => {
    toast.info(`Viewing order ${order.orderNo}`);
  };

  const handleInvoice = (order: Order) => {
    toast.success(`Generating invoice for ${order.orderNo}`);
  };

  const handleAddOrderManual = () => {
    toast.info("Add manual order feature coming soon!");
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
      const orderDate = new Date(
        parseInt(year),
        monthMap[monthStr],
        parseInt(day),
      );

      if (orderDate < dateRange.from || orderDate > dateRange.to) {
        return false;
      }
    }

    return true;
  });

  const columns = createColumns(handleView, handleInvoice);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Header */}
      <OrdersHeader onAddOrderManual={handleAddOrderManual} />

      {/* Metrics */}
      <OrdersMetrics orders={orders} />

      {/* Filters & Table */}
      <div className="space-y-4">
        <OrdersFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedStatuses={selectedStatuses}
          onStatusToggle={handleStatusToggle}
        />

        <OrdersTable
          columns={columns}
          data={filteredOrders}
        />
      </div>
    </div>
  );
}

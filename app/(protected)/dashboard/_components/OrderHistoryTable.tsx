"use client";

import { CalendarIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import OrdersTable from "@/components/orders/OrdersTable";
import { Order } from "@/types/entities";
import { toast } from "sonner";

// Mock data for demonstration
const mockOrders: any[] = [
  {
    id: 9192,
    orderNo: "#4712",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 120,
    status: "delivered",
    createdAt: "2026-01-17T14:38:00Z",
    createdBy: "Kot Kot",
    customerId: 1,
    customerName: "Kot Kot",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 120,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    deliveryStatus: "DELIVERED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9191,
    orderNo: "#8954",
    restaurantName: "Abu's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 450,
    status: "delivered",
    createdAt: "2026-01-17T14:35:00Z",
    createdBy: "Kot Kot",
    customerId: 1,
    customerName: "Kot Kot",
    customerPhone: "123",
    restaurantId: 2,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 450,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    deliveryStatus: "DELIVERED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9190,
    orderNo: "#9465",
    restaurantName: "Abu's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 72.0,
    status: "cancelled",
    createdAt: "2026-01-17T08:59:00Z",
    createdBy: "Bele Shewa",
    customerId: 2,
    customerName: "Bele Shewa",
    customerPhone: "123",
    restaurantId: 2,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 72,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "pending",
    deliveryStatus: "RESTAURANT_REJECTED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9189,
    orderNo: "#6667",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 24.0,
    status: "cancelled",
    createdAt: "2026-01-17T07:45:00Z",
    createdBy: "Bele Shewa",
    customerId: 2,
    customerName: "Bele Shewa",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 24,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "pending",
    deliveryStatus: "RESTAURANT_REJECTED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9188,
    orderNo: "#3421",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 285,
    status: "delivered",
    createdAt: "2026-01-16T18:22:00Z",
    createdBy: "Kot Kot",
    customerId: 1,
    customerName: "Kot Kot",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 285,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    deliveryStatus: "DELIVERED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9187,
    orderNo: "#7823",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 156,
    status: "accepted",
    createdAt: "2026-01-16T15:10:00Z",
    createdBy: "Bele Shewa",
    customerId: 2,
    customerName: "Bele Shewa",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 156,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "pending",
    deliveryStatus: "PICKED_UP",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9186,
    orderNo: "#5512",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 340,
    status: "ready",
    createdAt: "2026-01-16T12:45:00Z",
    createdBy: "Kot Kot",
    customerId: 1,
    customerName: "Kot Kot",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 340,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    deliveryStatus: "READY_FOR_PICKUP",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9185,
    orderNo: "#9234",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 198,
    status: "preparing",
    createdAt: "2026-01-16T11:30:00Z",
    createdBy: "Bele Shewa",
    customerId: 2,
    customerName: "Bele Shewa",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 198,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "pending",
    deliveryStatus: "PREPARING",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9184,
    orderNo: "#4156",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 425,
    status: "accepted",
    createdAt: "2026-01-16T09:15:00Z",
    createdBy: "Kot Kot",
    customerId: 1,
    customerName: "Kot Kot",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 425,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    deliveryStatus: "CONFIRMED",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
  {
    id: 9183,
    orderNo: "#6789",
    restaurantName: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    status: "pending",
    createdAt: "2026-01-15T20:05:00Z",
    createdBy: "Bele Shewa",
    customerId: 2,
    customerName: "Bele Shewa",
    customerPhone: "123",
    restaurantId: 1,
    addressId: 1,
    deliveryFee: 0,
    offerDiscount: 0,
    finalTotal: 89,
    platformFeeAmount: 0,
    paymentMethod: "cash",
    paymentStatus: "pending",
    deliveryStatus: "PENDING",
    driverId: 1,
    deliveryLatitude: 0,
    deliveryLongitude: 0,
  },
];

const statuses = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

export function OrderHistoryTable() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const handleInvoice = (id: number) => {
    toast.success(`Generating invoice for order ID: ${id}`);
  };

  // Filter orders by date range, search text, and status
  const filteredOrders = mockOrders.filter((order) => {
    // Status filter
    if (
      selectedStatuses.length > 0 &&
      !selectedStatuses.includes(order.status)
    ) {
      return false;
    }

    // Date range filter
    if (dateRange?.from && dateRange?.to) {
      const orderDate = new Date(order.createdAt);

      if (orderDate < dateRange.from || orderDate > dateRange.to) {
        return false;
      }
    }

    // Search filter
    if (globalFilter) {
      const searchLower = globalFilter.toLowerCase();
      return (
        order.orderNo.toLowerCase().includes(searchLower) ||
        order.restaurantName.toLowerCase().includes(searchLower) ||
        order.createdBy.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  const clearDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg border border-gray-200 dark:border-gray-700/90">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Recent Orders
      </h2>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search orders..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1 min-w-4xl border-2 outline-primary border-primary/40 dark:border-primary/70"
        />

        <div className="flex items-center gap-4">
          {/* Date Filter */}
          <div
            className="relative"
            ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/25 border-2 border-primary rounded-lg transition">
              <CalendarIcon className="h-4 w-4" />
              {dateRange?.from && dateRange?.to ? (
                <span>
                  {format(dateRange.from, "MMM dd")} -{" "}
                  {format(dateRange.to, "MMM dd")}
                </span>
              ) : (
                <span>Filter by Date</span>
              )}
            </button>

            {isCalendarOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Select Date Range
                  </h3>
                  {(dateRange.from || dateRange.to) && (
                    <button
                      onClick={clearDateFilter}
                      className="text-xs text-primary hover:underline">
                      Clear
                    </button>
                  )}
                </div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                  className="rounded-md"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => setIsCalendarOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/25 border-2 border-primary rounded-lg transition">
              Status
              {selectedStatuses.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                  {selectedStatuses.length}
                </span>
              )}
            </button>
            <Dropdown
              isOpen={isStatusDropdownOpen}
              onClose={() => setIsStatusDropdownOpen(false)}
              className="w-56">
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  Select Status
                </div>
                <div className="max-h-60 overflow-y-auto no-scrollbar">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Checkbox
                        label={status.toLowerCase().replace(/_/g, " ")}
                        checked={selectedStatuses.includes(status)}
                        onChange={() => handleStatusToggle(status)}
                        className="capitalize"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      <OrdersTable
        data={filteredOrders}
        variant="recent"
        onInvoice={handleInvoice}
      />
    </div>
  );
}

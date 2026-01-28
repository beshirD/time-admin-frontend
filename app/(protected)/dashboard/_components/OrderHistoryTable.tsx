"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CalendarIcon,
  Settings2,
} from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";

// Order type definition
export type Order = {
  id: number;
  orderNo: string;
  store: string;
  address: string;
  totalPrice: number;
  deliveryStatus:
    | "RESTAURANT_REJECTED"
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY_FOR_PICKUP"
    | "PICKED_UP"
    | "DELIVERED"
    | "CANCELLED";
  createdOn: string;
  createdBy: string;
};

// Status badge component
const StatusBadge = ({ status }: { status: Order["deliveryStatus"] }) => {
  const statusStyles = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    CONFIRMED:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    PREPARING:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    READY_FOR_PICKUP:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
    PICKED_UP:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    DELIVERED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    RESTAURANT_REJECTED:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusLabels = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PREPARING: "Preparing",
    READY_FOR_PICKUP: "Ready for Pickup",
    PICKED_UP: "Picked Up",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    RESTAURANT_REJECTED: "Restaurant Rejected",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

// Actions dropdown component
const ActionsDropdown = ({ orderId }: { orderId: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleView = () => {
    console.log("View order:", orderId);
    setIsOpen(false);
  };

  const handleEdit = () => {
    console.log("Edit order:", orderId);
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete order:", orderId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
        <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-40">
        <div className="py-1">
          <button
            onClick={handleView}
            className="w-full px-4 py-2 text-left text-sm flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View
          </button>
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-red-600 dark:text-red-400">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

// Column definitions
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNo",
    header: "Order No",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.original.orderNo}
      </span>
    ),
  },
  {
    accessorKey: "store",
    header: "Store",
    cell: ({ row }) => (
      <span className="text-gray-900 dark:text-gray-100">
        {row.original.store}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-lg">🇪🇹</span>
        <span className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate block">
          {row.original.address}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.original.totalPrice.toFixed(2)} ETB
      </span>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => <StatusBadge status={row.original.deliveryStatus} />,
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {row.original.createdOn}
      </span>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <span className="text-gray-900 dark:text-gray-100">
        {row.original.createdBy}
      </span>
    ),
  },
  {
    id: "actions-left",
    header: "",
    cell: ({ row }) => <ActionsDropdown orderId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
];

// let us change some of the sore names
// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 9192,
    orderNo: "#4712",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 120,
    deliveryStatus: "DELIVERED",
    createdOn: "17-Jan-2026 14:38",
    createdBy: "Kot Kot",
  },
  {
    id: 9191,
    orderNo: "#8954",
    store: "Abu's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 450,
    deliveryStatus: "DELIVERED",
    createdOn: "17-Jan-2026 14:35",
    createdBy: "Kot Kot",
  },
  {
    id: 9190,
    orderNo: "#9465",
    store: "Abu's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 72.0,
    deliveryStatus: "RESTAURANT_REJECTED",
    createdOn: "17-Jan-2026 08:59",
    createdBy: "Bele Shewa",
  },
  {
    id: 9189,
    orderNo: "#6667",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 24.0,
    deliveryStatus: "RESTAURANT_REJECTED",
    createdOn: "17-Jan-2026 07:45",
    createdBy: "Bele Shewa",
  },
  {
    id: 9188,
    orderNo: "#3421",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 285,
    deliveryStatus: "DELIVERED",
    createdOn: "16-Jan-2026 18:22",
    createdBy: "Kot Kot",
  },
  {
    id: 9187,
    orderNo: "#7823",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 156,
    deliveryStatus: "PICKED_UP",
    createdOn: "16-Jan-2026 15:10",
    createdBy: "Bele Shewa",
  },
  {
    id: 9186,
    orderNo: "#5512",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 340,
    deliveryStatus: "READY_FOR_PICKUP",
    createdOn: "16-Jan-2026 12:45",
    createdBy: "Kot Kot",
  },
  {
    id: 9185,
    orderNo: "#9234",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 198,
    deliveryStatus: "PREPARING",
    createdOn: "16-Jan-2026 11:30",
    createdBy: "Bele Shewa",
  },
  {
    id: 9184,
    orderNo: "#4156",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 425,
    deliveryStatus: "CONFIRMED",
    createdOn: "16-Jan-2026 09:15",
    createdBy: "Kot Kot",
  },
  {
    id: 9183,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9182,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9181,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9180,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9179,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9178,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9177,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9176,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
  {
    id: 9175,
    orderNo: "#6789",
    store: "Habibi's Kitchen",
    address: "XQMQ+9G8, Addis Ababa, Ethiopia",
    totalPrice: 89,
    deliveryStatus: "PENDING",
    createdOn: "15-Jan-2026 20:05",
    createdBy: "Bele Shewa",
  },
];

// Main component
export function OrderHistoryTable() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
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

  // Filter orders by date range and search text
  const filteredOrders = mockOrders.filter((order) => {
    // Date range filter
    if (dateRange.from && dateRange.to) {
      const orderDateParts = order.createdOn.split(" ")[0].split("-");
      const day = parseInt(orderDateParts[0]);
      const monthMap: { [key: string]: number } = {
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
      const month = monthMap[orderDateParts[1]];
      const year = parseInt(orderDateParts[2]);
      const orderDate = new Date(year, month, day);

      if (!(orderDate >= dateRange.from && orderDate <= dateRange.to)) {
        return false;
      }
    }

    // Search filter
    if (globalFilter) {
      const searchLower = globalFilter.toLowerCase();
      return (
        order.orderNo.toLowerCase().includes(searchLower) ||
        order.store.toLowerCase().includes(searchLower) ||
        order.createdBy.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const handleDateSelect = (
    range: { from: Date | undefined; to: Date | undefined } | undefined,
  ) => {
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

      {/* Toolbar with Search, Date Filter, and Column Visibility in one row */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search orders..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex min-w-4xl border-2 outline-primary border-primary/40 dark:border-primary/70"
        />

        <div className="flex items-center gap-4">
          {/* Date Range Filter */}
          <div
            className="relative"
            ref={calendarRef}>
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-white dark:bg-gray-800 border border-primary rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <CalendarIcon className="h-4 w-4" />
              {dateRange.from && dateRange.to ? (
                <span>
                  {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                  {format(dateRange.to, "MMM dd, yyyy")}
                </span>
              ) : (
                <span>Filter by Start & End Date</span>
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

          {/* Edit Columns Button */}
          <div className="relative">
            <button
              onClick={() => setColumnDropdownOpen(!columnDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-white dark:bg-gray-800 border border-primary rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Settings2 className="h-4 w-4" />
              Edit Columns
            </button>
            <Dropdown
              isOpen={columnDropdownOpen}
              onClose={() => setColumnDropdownOpen(false)}
              className="w-48">
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  Toggle columns
                </div>
                {columns
                  .filter((column) => column.accessorKey) // Only show columns with accessorKey
                  .map((column) => {
                    const columnId = column.accessorKey as string;
                    return (
                      <div
                        key={columnId}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Checkbox
                          label={columnId}
                          checked={columnVisibility[columnId] !== false}
                          onChange={(value) =>
                            setColumnVisibility((prev) => ({
                              ...prev,
                              [columnId]: !!value,
                            }))
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        searchPlaceholder="Search orders..."
        searchableColumns={["orderNo", "store", "createdBy"]}
        enableSearch={false}
        enableColumnVisibility={false}
        scrollableContainer={true}
        maxHeight="400px"
        stickyHeader={true}
      />
    </div>
  );
}

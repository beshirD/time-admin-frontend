"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { useState } from "react";

// Order type definition
export type Order = {
  id: string;
  orderId: string;
  orderDate: string;
  customer: {
    name: string;
    email: string;
    flag: string; // Country flag emoji or code
  };
  orderStatus: "Pending" | "Shipped" | "Delivered" | "Canceled" | "In Transit";
  productsOrdered: {
    name: string;
    quantity: number;
  };
  delivery: {
    date: string;
    type: string; // e.g., "Standard Delivery", "Express Delivery"
    icon?: string;
  };
  paymentMethod: "COD" | "UPI" | "Credit Card" | "Debit Card" | "PayPal";
  paymentStatus: "Paid" | "Pending";
  amount: string;
};

// Status badge component
const StatusBadge = ({ status }: { status: Order["orderStatus"] }) => {
  const statusStyles = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Canceled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    "In Transit":
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Payment status badge component
const PaymentStatusBadge = ({ status }: { status: Order["paymentStatus"] }) => {
  const statusStyles = {
    Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Actions dropdown component
const ActionsDropdown = ({ orderId }: { orderId: string }) => {
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
    id: "actions-left",
    header: "",
    cell: ({ row }) => <ActionsDropdown orderId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {row.original.orderId}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Order Date: {row.original.orderDate}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-lg">{row.original.customer.flag}</span>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {row.original.customer.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {row.original.customer.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => <StatusBadge status={row.original.orderStatus} />,
  },
  {
    accessorKey: "productsOrdered",
    header: "Products Ordered",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-gray-900 dark:text-gray-100">
          {row.original.productsOrdered.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          x {row.original.productsOrdered.quantity}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "delivery",
    header: "Delivery",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-gray-900 dark:text-gray-100">
          {row.original.delivery.date}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          {row.original.delivery.icon && (
            <span>{row.original.delivery.icon}</span>
          )}
          <span>{row.original.delivery.type}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Methods",
    cell: ({ row }) => (
      <span className="text-gray-900 dark:text-gray-100">
        {row.original.paymentMethod}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <PaymentStatusBadge status={row.original.paymentStatus} />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.original.amount}
      </span>
    ),
  },
];

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2025-000112",
    orderDate: "12/01/2025",
    customer: {
      name: "Selena Senca",
      email: "selena.senca@gmail.com",
      flag: "🇺🇸",
    },
    orderStatus: "Pending",
    productsOrdered: {
      name: "1202- Pen Holder",
      quantity: 3,
    },
    delivery: {
      date: "19/01/2025",
      type: "Standard Delivery",
      icon: "🚚",
    },
    paymentMethod: "COD",
    paymentStatus: "Paid",
    amount: "311.00 USD",
  },
  {
    id: "2",
    orderId: "ORD-2025-00111",
    orderDate: "12/01/2025",
    customer: {
      name: "K. Houston",
      email: "karen@houston.com",
      flag: "🇬🇧",
    },
    orderStatus: "Shipped",
    productsOrdered: {
      name: "1203- Desk buddy",
      quantity: 1,
    },
    delivery: {
      date: "29/01/2025",
      type: "Standard Delivery",
    },
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    amount: "223.00 USD",
  },
  {
    id: "3",
    orderId: "ORD-2025-00110",
    orderDate: "11/01/2025",
    customer: {
      name: "Ramnik Voizkat",
      email: "ramnik.voizkat@gmail.com",
      flag: "🇫🇮",
    },
    orderStatus: "Delivered",
    productsOrdered: {
      name: "1105- Standing Mat",
      quantity: 2,
    },
    delivery: {
      date: "28/01/2025",
      type: "Express Delivery",
      icon: "🚀",
    },
    paymentMethod: "Credit Card",
    paymentStatus: "Pending",
    amount: "1200.00 USD",
  },
  {
    id: "4",
    orderId: "ORD-2025-00109",
    orderDate: "11/01/2025",
    customer: {
      name: "Jennifer Kline",
      email: "jennifer.kline@email.com",
      flag: "🇦🇹",
    },
    orderStatus: "Canceled",
    productsOrdered: {
      name: "1202- Pen Holder",
      quantity: 3,
    },
    delivery: {
      date: "19/01/2025",
      type: "Standard Delivery",
      icon: "🚚",
    },
    paymentMethod: "COD",
    paymentStatus: "Paid",
    amount: "311.00 USD",
  },
  {
    id: "5",
    orderId: "ORD-2025-00108",
    orderDate: "11/01/2025",
    customer: {
      name: "Kate Dominic",
      email: "kate.dominic@gmail.com",
      flag: "🇧🇷",
    },
    orderStatus: "Pending",
    productsOrdered: {
      name: "1203- Desk buddy",
      quantity: 1,
    },
    delivery: {
      date: "29/01/2025",
      type: "Standard Delivery",
    },
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    amount: "223.00 USD",
  },
  {
    id: "6",
    orderId: "ORD-2025-00110",
    orderDate: "11/01/2025",
    customer: {
      name: "Selena Senca",
      email: "selena.senca@gmail.com",
      flag: "🇺🇸",
    },
    orderStatus: "Shipped",
    productsOrdered: {
      name: "1105- Standing Mat",
      quantity: 2,
    },
    delivery: {
      date: "28/01/2025",
      type: "Express Delivery",
      icon: "🚀",
    },
    paymentMethod: "Credit Card",
    paymentStatus: "Pending",
    amount: "1200.00 USD",
  },
  {
    id: "7",
    orderId: "ORD-2025-00109",
    orderDate: "11/01/2025",
    customer: {
      name: "K. Houston",
      email: "karen@houston.com",
      flag: "🇬🇧",
    },
    orderStatus: "Delivered",
    productsOrdered: {
      name: "1087- Study Lamp",
      quantity: 3,
    },
    delivery: {
      date: "17/01/2025",
      type: "Express Delivery",
      icon: "🚀",
    },
    paymentMethod: "Debit Card",
    paymentStatus: "Pending",
    amount: "8876.00 USD",
  },
  {
    id: "8",
    orderId: "ORD-2025-00108",
    orderDate: "11/01/2025",
    customer: {
      name: "Ramnik Voizkat",
      email: "ramnik.voizkat@gmail.com",
      flag: "🇫🇮",
    },
    orderStatus: "In Transit",
    productsOrdered: {
      name: "1024- Keycap Holder",
      quantity: 12,
    },
    delivery: {
      date: "13/01/2025",
      type: "Express Delivery",
      icon: "🚀",
    },
    paymentMethod: "PayPal",
    paymentStatus: "Paid",
    amount: "111.00 USD",
  },
];

// Main component
export function OrderHistoryTable() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg border border-gray-200 dark:border-gray-700/90">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Order History Table
      </h2>
      <DataTable
        columns={columns}
        data={mockOrders}
        searchPlaceholder="Search orders..."
        searchableColumns={["orderId", "customer", "orderStatus"]}
        enableSearch={true}
        enableColumnVisibility={true}
        scrollableContainer={true}
        maxHeight="400px"
        stickyHeader={true}
      />
    </div>
  );
}

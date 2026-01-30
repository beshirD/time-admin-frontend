"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import { SubscriptionQueue } from "@/types/entities";
import { toast } from "sonner";

// Action buttons component
const ActionButtons = ({ queue }: { queue: SubscriptionQueue }) => {
  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Accepted subscription request for ${queue.restaurant}`);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.error(`Rejected subscription request for ${queue.restaurant}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAccept}
        className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 rounded-md transition-colors">
        Accept
      </button>
      <button
        onClick={handleReject}
        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 rounded-md transition-colors">
        Reject
      </button>
      <Link
        href={`/banner/approval-queue/${queue.id}`}
        onClick={(e) => e.stopPropagation()}>
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center gap-1">
          <Eye className="h-3 w-3" />
          Details
        </button>
      </Link>
    </div>
  );
};

export const columns: ColumnDef<SubscriptionQueue>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "restaurant",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Restaurant
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("restaurant")}</div>,
  },
  {
    accessorKey: "package",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Package
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("package")}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>${row.getValue("amount")}</div>,
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => <div>{row.getValue("merchant")}</div>,
  },
  {
    accessorKey: "requestedOn",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Requested On
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("requestedOn")}</div>,
  },
  {
    accessorKey: "paymentProof",
    header: "Payment Proof",
    cell: ({ row }) => (
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        {row.getValue("paymentProof")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const queue = row.original;
      return <ActionButtons queue={queue} />;
    },
  },
];

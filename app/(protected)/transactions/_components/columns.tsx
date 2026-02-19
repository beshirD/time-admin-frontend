"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, RefreshCw } from "lucide-react";
import type { Transaction } from "@/types/entities";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    SUCCESS:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    FAILED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.PENDING}`}>
      {status}
    </span>
  );
};

const DirectionBadge = ({ direction }: { direction: string }) => {
  const directionStyles: Record<string, string> = {
    CHARGE: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    REFUND:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${directionStyles[direction] || ""}`}>
      {direction}
    </span>
  );
};

// Action button component
const ActionButton = ({
  transaction,
  onChangeStatus,
}: {
  transaction: Transaction;
  onChangeStatus: (transaction: Transaction) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChangeStatus(transaction);
        }}
        className="px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary bg-primary/10 rounded-md transition-colors flex items-center gap-2">
        <RefreshCw className="h-3 w-3" />
        Change Status
      </button>
    </div>
  );
};

export const createColumns = (
  onChangeStatus: (transaction: Transaction) => void,
): ColumnDef<Transaction>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <div
        className="text-xs font-mono max-w-[180px] truncate"
        title={row.getValue("reference")}>
        {row.getValue("reference")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.original.currency;
      return (
        <div className="font-medium">
          {amount.toFixed(2)} {currency}
        </div>
      );
    },
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
    cell: ({ row }) => <div className="text-sm">{row.getValue("gateway")}</div>,
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ row }) => <DirectionBadge direction={row.getValue("direction")} />,
  },
  {
    accessorKey: "payableType",
    header: "Payable Type",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("payableType")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(date).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <ActionButton
          transaction={transaction}
          onChangeStatus={onChangeStatus}
        />
      );
    },
  },
];

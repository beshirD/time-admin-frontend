"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { useState } from "react";
import { Subscription } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status.toLowerCase().includes("active");
  const isExpired = status.toLowerCase().includes("expired");

  let statusStyles =
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";

  if (isActive) {
    statusStyles =
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  } else if (isExpired) {
    statusStyles =
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({ subscription }: { subscription: Subscription }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="dropdown-toggle p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20">
        <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-40 right-0">
        <div className="p-1 flex flex-col gap-0.5">
          <Link
            href={`/banner/subscriptions/${subscription.id}`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4" />
            View
          </Link>
          <Link
            href={`/banner/subscriptions/${subscription.id}/edit`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <DeleteConfirmationDialog
            itemType="subscription"
            itemName={subscription.restaurant}
            onSuccess={() => {
              window.location.reload();
            }}
            trigger={
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}>
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            }
          />
        </div>
      </Dropdown>
    </div>
  );
};

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "banners",
    header: "Banners",
    cell: ({ row }) => <div>{row.getValue("banners")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>${row.getValue("amount")}</div>,
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("created")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subscription = row.original;
      return <ActionButtons subscription={subscription} />;
    },
  },
];

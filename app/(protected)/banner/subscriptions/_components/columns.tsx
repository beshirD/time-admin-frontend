"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
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
  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/banner/subscriptions/${subscription.id}`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="view">View</Button>
      </Link>
      <Link
        href={`/banner/subscriptions/${subscription.id}/edit`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="edit">Edit</Button>
      </Link>
      <DeleteConfirmationDialog
        itemType="subscription"
        itemName={subscription.restaurant}
        onSuccess={() => {
          window.location.reload();
        }}
        trigger={
          <Button
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            Delete
          </Button>
        }
      />
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

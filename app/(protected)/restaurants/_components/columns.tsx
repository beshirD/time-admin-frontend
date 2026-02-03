"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { useState } from "react";
import Image from "next/image";

import { Restaurant } from "@/types/entities";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive}`}>
      {status}
    </span>
  );
};

import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Action buttons component
const ActionButtons = ({ restaurant }: { restaurant: Restaurant }) => {
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
            href={`/restaurants/${restaurant.id}`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4" />
            View
          </Link>
          <Link
            href={`/restaurants/${restaurant.id}/edit`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <DeleteConfirmationDialog
            itemType="Restaurant"
            itemName={restaurant.restaurantName}
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

export const columns: ColumnDef<Restaurant>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "restaurantName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Restaurant Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("restaurantName")}</div>,
  },
  {
    accessorKey: "fee",
    header: "Fee",
    cell: ({ row }) => <div>{row.getValue("fee") || "-"}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div
        className="max-w-xs truncate"
        title={row.getValue("location")}>
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div className="flex items-center">
          {imageUrl ? (
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={imageUrl}
                alt={row.getValue("restaurantName")}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-xs text-gray-400">No img</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stateId",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("stateId")} />,
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created On
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("createdOn")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const restaurant = row.original;
      return <ActionButtons restaurant={restaurant} />;
    },
  },
];

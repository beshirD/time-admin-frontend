"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

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
  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/restaurants/${restaurant.id}`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="view">View</Button>
      </Link>
      <Link
        href={`/restaurants/${restaurant.id}/edit`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="edit">Edit</Button>
      </Link>
      <DeleteConfirmationDialog
        itemType="Restaurant"
        itemName={restaurant.restaurantName}
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

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

import { Restaurant, RestaurantStatus } from "@/types/entities";

// Status badge component
const StatusBadge = ({ status }: { status: RestaurantStatus }) => {
  const statusStyles: Record<RestaurantStatus, string> = {
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    approved:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    suspended:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Availability badge component
const AvailabilityBadge = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAvailable
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      }`}>
      {isAvailable ? "Available" : "Unavailable"}
    </span>
  );
};

// Rating display component
const RatingDisplay = ({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) => {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
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
        itemName={restaurant.name}
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
    accessorKey: "name",
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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Restaurant["category"];
      return <div>{category?.title || "N/A"}</div>;
    },
  },
  {
    accessorKey: "cuisine",
    header: "Cuisine",
    cell: ({ row }) => <div>{row.getValue("cuisine") || "N/A"}</div>,
  },
  {
    accessorKey: "averageRating",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rating
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("averageRating") as number | null;
      const count = row.original.numberOfRatings;

      if (!rating || !count) {
        return <div className="text-gray-400">No ratings</div>;
      }

      return (
        <RatingDisplay
          rating={rating}
          count={count}
        />
      );
    },
  },
  {
    accessorKey: "deliveryTimeMinutes",
    header: "Delivery Time",
    cell: ({ row }) => {
      const time = row.getValue("deliveryTimeMinutes") as number | null;
      return <div>{time ? `${time} min` : "N/A"}</div>;
    },
  },
  {
    accessorKey: "addressLine",
    header: "Address",
    cell: ({ row }) => (
      <div
        className="max-w-xs truncate"
        title={row.getValue("addressLine")}>
        {row.getValue("addressLine")}
      </div>
    ),
  },
  {
    accessorKey: "featuredImage",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("featuredImage") as string;
      return (
        <div className="flex items-center">
          {imageUrl ? (
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={imageUrl}
                alt={row.original.name}
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
    accessorKey: "isAvailable",
    header: "Availability",
    cell: ({ row }) => (
      <AvailabilityBadge isAvailable={row.getValue("isAvailable")} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
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

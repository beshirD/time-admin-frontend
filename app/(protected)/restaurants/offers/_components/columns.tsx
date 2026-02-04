"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2, Eye } from "lucide-react";
import { RestaurantOffer } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Action buttons component
const ActionButtons = ({
  offer,
  onView,
}: {
  offer: RestaurantOffer;
  onView: (offer: RestaurantOffer) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(offer);
        }}
        className="px-3 py-1.5 text-sm font-medium border-blue-600 border-2 text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/20 rounded-md transition-colors flex items-center gap-2">
        <Eye className="h-3 w-3" />
        View
      </button>
      <DeleteConfirmationDialog
        itemType="Offer"
        itemName={offer.title}
        onSuccess={() => {
          window.location.reload();
        }}
        trigger={
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="px-3 py-1.5 text-sm font-medium border-red-700 border-2 text-red-500 bg-red-600/10 rounded-md transition-colors flex items-center gap-2">
            <Trash2 className="h-3 w-3" />
            Delete
          </button>
        }
      />
    </div>
  );
};

export const createColumns = (
  onView: (offer: RestaurantOffer) => void,
): ColumnDef<RestaurantOffer>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("discountType") === "amount"
          ? "Amount (AFN)"
          : "Percentage (%)"}
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const type = row.original.discountType;
      const discount = row.getValue("discount") as number;
      return (
        <div className="font-medium">
          {type === "amount" ? `${discount} AFN` : `${discount}%`}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const offer = row.original;
      return (
        <ActionButtons
          offer={offer}
          onView={onView}
        />
      );
    },
  },
];

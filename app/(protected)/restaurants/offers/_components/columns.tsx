"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { RestaurantOffer } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";

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
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onView(offer);
        }}>
        View
      </Button>
      <DeleteConfirmationDialog
        itemType="Offer"
        itemName={offer.title}
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

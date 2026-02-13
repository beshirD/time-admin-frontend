"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { RestaurantOffer } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";
import { useDeleteOffer } from "@/hooks/useDeleteOffer";

// Action buttons component
const ActionButtons = ({
  offer,
  onView,
}: {
  offer: RestaurantOffer;
  onView: (offer: RestaurantOffer) => void;
}) => {
  const deleteOffer = useDeleteOffer();

  const handleDelete = async () => {
    await deleteOffer.mutateAsync(offer.id);
  };

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
        onConfirm={handleDelete}
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
  restaurantMap: Map<number, string>,
): ColumnDef<RestaurantOffer>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "restaurantId",
    header: "Restaurant",
    cell: ({ row }) => {
      const restaurantId = row.getValue("restaurantId") as number;
      const restaurantName =
        restaurantMap.get(restaurantId) || `ID: ${restaurantId}`;
      return <div>{restaurantName}</div>;
    },
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
    accessorKey: "couponCode",
    header: "Coupon Code",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("couponCode")}</div>
    ),
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("discountType") === "fixed_amount"
          ? "Amount (AFN)"
          : "Percentage (%)"}
      </div>
    ),
  },
  {
    accessorKey: "discountValue",
    header: "Discount",
    cell: ({ row }) => {
      const type = row.original.discountType;
      const discount = row.getValue("discountValue") as number;
      return (
        <div className="font-medium">
          {type === "fixed_amount" ? `${discount} AFN` : `${discount}%`}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
          }`}>
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return <div>{date.toLocaleDateString()}</div>;
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

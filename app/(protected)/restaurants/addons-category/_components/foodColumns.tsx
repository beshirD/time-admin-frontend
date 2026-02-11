"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FoodCategory } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[status] || statusStyles.Active}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  category,
  onEdit,
  onViewDetails,
  onDelete,
}: {
  category: FoodCategory;
  onEdit: (category: FoodCategory) => void;
  onViewDetails: (category: FoodCategory) => void;
  onDelete: (id: number) => Promise<void>;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(category);
        }}>
        View
      </Button>
      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(category);
        }}>
        Edit
      </Button>
      <DeleteConfirmationDialog
        itemType="Restaurant Category"
        itemName={category.title}
        onConfirm={async () => {
          await onDelete(category.id);
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

export const createFoodColumns = (
  onEdit: (category: FoodCategory) => void,
  onViewDetails: (category: FoodCategory) => void,
  onDelete: (id: number) => Promise<void>,
): ColumnDef<FoodCategory>[] => [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // Handle both new 'status' and legacy 'state' fields
      const status = row.original.status || row.original.state || "active";
      return <StatusBadge status={status} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionButtons
          category={category}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      );
    },
  },
];

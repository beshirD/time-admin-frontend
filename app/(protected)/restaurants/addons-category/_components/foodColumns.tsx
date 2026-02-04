"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2, Eye } from "lucide-react";
import { FoodCategory } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Active}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  category,
  onEdit,
  onViewDetails,
}: {
  category: FoodCategory;
  onEdit: (category: FoodCategory) => void;
  onViewDetails: (category: FoodCategory) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(category);
        }}
        className="px-3 py-1.5 text-sm font-medium border-blue-600 border-2 text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/20 rounded-md transition-colors flex items-center gap-2">
        <Eye className="h-3 w-3" />
        View
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(category);
        }}
        className="px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary bg-primary/10 rounded-md transition-colors flex items-center gap-2">
        <Pencil className="h-3 w-3" />
        Edit
      </button>
      <DeleteConfirmationDialog
        itemType="Food Category"
        itemName={category.title}
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

export const createFoodColumns = (
  onEdit: (category: FoodCategory) => void,
  onViewDetails: (category: FoodCategory) => void,
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
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("state")} />,
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
        />
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Cuisine } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";

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

// Action buttons component
const ActionButtons = ({
  cuisine,
  onEdit,
}: {
  cuisine: Cuisine;
  onEdit: (cuisine: Cuisine) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(cuisine);
        }}
        className="gap-1.5">
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Button>
      <DeleteConfirmationDialog
        itemType="Cuisine"
        itemName={cuisine.title}
        onSuccess={() => {
          window.location.reload();
        }}
        trigger={
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="gap-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800">
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        }
      />
    </div>
  );
};

export const createColumns = (
  onEdit: (cuisine: Cuisine) => void,
): ColumnDef<Cuisine>[] => [
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
      const cuisine = row.original;
      return (
        <ActionButtons
          cuisine={cuisine}
          onEdit={onEdit}
        />
      );
    },
  },
];

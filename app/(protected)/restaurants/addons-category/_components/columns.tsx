"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { AddOnCategory } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";

// Action buttons component
const ActionButtons = ({
  category,
  onEdit,
}: {
  category: AddOnCategory;
  onEdit: (category: AddOnCategory) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-end">
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
        itemType="Add-On Category"
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

export const createColumns = (
  onEdit: (category: AddOnCategory) => void,
): ColumnDef<AddOnCategory>[] => [
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
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
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
        />
      );
    },
  },
];

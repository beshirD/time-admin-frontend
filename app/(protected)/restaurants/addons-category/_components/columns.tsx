"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AddOnCategory } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";

// Action buttons component
const ActionButtons = ({
  category,
  onEdit,
  onDelete,
}: {
  category: AddOnCategory;
  onEdit: (category: AddOnCategory) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(category);
        }}>
        Edit
      </Button>
      <DeleteConfirmationDialog
        itemType="Add-On Category"
        itemName={category.title}
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
  onEdit: (category: AddOnCategory) => void,
  onDelete: (id: number) => void,
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
    accessorKey: "addons",
    header: "Add-Ons Count",
    cell: ({ row }) => {
      const addons = row.getValue("addons") as unknown[];
      return <div>{addons?.length || 0}</div>;
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
          onDelete={onDelete}
        />
      );
    },
  },
];

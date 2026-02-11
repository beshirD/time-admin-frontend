"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Cuisine } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import Button from "@/components/ui/Button";
import Image from "next/image";

// Status badge component
const StatusBadge = ({ status }: { status: "active" | "inactive" }) => {
  const statusStyles = {
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  cuisine,
  onEdit,
  onDelete,
}: {
  cuisine: Cuisine;
  onEdit: (cuisine: Cuisine) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(cuisine);
        }}>
        Edit
      </Button>
      <DeleteConfirmationDialog
        itemType="Cuisine"
        itemName={cuisine.title}
        onSuccess={() => {
          onDelete(cuisine.id);
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
  onEdit: (cuisine: Cuisine) => void,
  onDelete: (id: number) => void,
): ColumnDef<Cuisine>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={row.original.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      );
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
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
          onDelete={onDelete}
        />
      );
    },
  },
];

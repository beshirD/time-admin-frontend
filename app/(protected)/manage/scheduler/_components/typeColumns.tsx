"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { CronJobType } from "@/types/entities";
import { DeleteTypeDialog } from "./DeleteTypeDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Disabled:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
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
  type,
  onEditClick,
}: {
  type: CronJobType;
  onEditClick: (type: CronJobType) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(type);
        }}>
        Edit
      </Button>

      <DeleteTypeDialog
        typeId={type.id}
        typeName={type.name}
        onDeleteSuccess={() => {
          // Optionally refresh the table
        }}>
        <Button
          usage="delete"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          Delete
        </Button>
      </DeleteTypeDialog>
    </div>
  );
};

export const createTypeColumns = (
  onEditClick: (type: CronJobType) => void,
): ColumnDef<CronJobType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("state")} />,
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
      const type = row.original;
      return (
        <ActionButtons
          type={type}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/ui/Button";
import { StorageType } from "@/types/entities";
import { DeleteStorageTypeDialog } from "./DeleteStorageTypeDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Disabled:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
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
  onViewClick,
  onEditClick,
}: {
  type: StorageType;
  onViewClick: (type: StorageType) => void;
  onEditClick: (type: StorageType) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(type);
        }}>
        View
      </Button>

      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(type);
        }}>
        Edit
      </Button>

      <DeleteStorageTypeDialog
        typeId={type.id}
        typeTitle={type.title}
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
      </DeleteStorageTypeDialog>
    </div>
  );
};

export const createStorageTypeColumns = (
  onViewClick: (type: StorageType) => void,
  onEditClick: (type: StorageType) => void,
): ColumnDef<StorageType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
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
      const type = row.original;
      return (
        <ActionButtons
          type={type}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

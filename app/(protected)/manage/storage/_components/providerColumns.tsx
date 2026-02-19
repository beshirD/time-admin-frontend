"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { StorageProvider } from "@/types/entities";
import { DeleteProviderDialog } from "./DeleteProviderDialog";

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
  provider,
  onViewClick,
  onEditClick,
}: {
  provider: StorageProvider;
  onViewClick: (provider: StorageProvider) => void;
  onEditClick: (provider: StorageProvider) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(provider);
        }}>
        View
      </Button>

      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(provider);
        }}>
        Edit
      </Button>

      <DeleteProviderDialog
        providerId={provider.id}
        providerTitle={provider.title}
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
      </DeleteProviderDialog>
    </div>
  );
};

export const createProviderColumns = (
  onViewClick: (provider: StorageProvider) => void,
  onEditClick: (provider: StorageProvider) => void,
): ColumnDef<StorageProvider>[] => [
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
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("key")}</div>
    ),
  },
  {
    accessorKey: "secret",
    header: "Secret",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("secret")}</div>
    ),
  },
  {
    accessorKey: "endpoint",
    header: "Endpoint",
    cell: ({ row }) => (
      <div
        className="max-w-xs truncate text-blue-600 dark:text-blue-400"
        title={row.getValue("endpoint")}>
        {row.getValue("endpoint")}
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("state")} />,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
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
      const provider = row.original;
      return (
        <ActionButtons
          provider={provider}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

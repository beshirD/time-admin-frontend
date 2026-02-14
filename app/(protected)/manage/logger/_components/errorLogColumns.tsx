"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { ErrorLog } from "@/types/entities";
import { DeleteErrorLogDialog } from "./DeleteErrorLogDialog";

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
  errorLog,
  onViewClick,
}: {
  errorLog: ErrorLog;
  onViewClick: (errorLog: ErrorLog) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(errorLog);
        }}>
        View
      </Button>

      <DeleteErrorLogDialog
        errorLogId={errorLog.id}
        errorMessage={errorLog.error}
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
      </DeleteErrorLogDialog>
    </div>
  );
};

export const createErrorLogColumns = (
  onViewClick: (errorLog: ErrorLog) => void,
): ColumnDef<ErrorLog>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "error",
    header: "Error",
    cell: ({ row }) => (
      <div
        className="max-w-md truncate"
        title={row.getValue("error")}>
        {row.getValue("error")}
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("state")} />,
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <div
        className="max-w-xs truncate text-blue-600 dark:text-blue-400"
        title={row.getValue("link")}>
        {row.getValue("link")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "userIp",
    header: "User IP",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("userIp")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div>{row.getValue("user")}</div>,
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
      const errorLog = row.original;
      return (
        <ActionButtons
          errorLog={errorLog}
          onViewClick={onViewClick}
        />
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { LoginHistory } from "@/types/entities";
import { DeleteLoginHistoryDialog } from "./DeleteLoginHistoryDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Success}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  history,
  onViewClick,
}: {
  history: LoginHistory;
  onViewClick: (history: LoginHistory) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(history);
        }}>
        View
      </Button>

      <DeleteLoginHistoryDialog
        historyId={history.id}
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
      </DeleteLoginHistoryDialog>
    </div>
  );
};

export const createLoginHistoryColumns = (
  onViewClick: (history: LoginHistory) => void,
): ColumnDef<LoginHistory>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "userIp",
    header: "User IP",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("userIp")}</div>
    ),
  },
  {
    accessorKey: "userAgent",
    header: "User Agent",
    cell: ({ row }) => (
      <div
        className="max-w-xs truncate"
        title={row.getValue("userAgent")}>
        {row.getValue("userAgent")}
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
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.getValue("code") || "—"}</div>,
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Create Time
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("createTime")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const history = row.original;
      return (
        <ActionButtons
          history={history}
          onViewClick={onViewClick}
        />
      );
    },
  },
];

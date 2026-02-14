"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";

import { CronJobLog } from "@/types/entities";
import { DeleteLogDialog } from "./DeleteLogDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "In-Progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Deleted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Pending}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  log,
  onViewClick,
  onEditClick,
}: {
  log: CronJobLog;
  onViewClick: (log: CronJobLog) => void;
  onEditClick: (log: CronJobLog) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(log);
        }}>
        View
      </Button>

      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(log);
        }}>
        Edit
      </Button>

      <DeleteLogDialog
        logId={log.id}
        logCronjob={log.cronjob}
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
      </DeleteLogDialog>
    </div>
  );
};

export const createLogColumns = (
  onViewClick: (log: CronJobLog) => void,
  onEditClick: (log: CronJobLog) => void,
): ColumnDef<CronJobLog>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
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
    accessorKey: "cronjob",
    header: "Cronjob",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("cronjob")}</div>
    ),
  },
  {
    accessorKey: "scheduledOn",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Scheduled On
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("scheduledOn")}</div>,
  },
  {
    accessorKey: "executedOn",
    header: "Executed On",
    cell: ({ row }) => (
      <div>
        {row.getValue("executedOn") || <span className="text-gray-400">—</span>}
      </div>
    ),
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
      const log = row.original;
      return (
        <ActionButtons
          log={log}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

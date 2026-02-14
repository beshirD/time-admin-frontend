"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";

import { CronJob } from "@/types/entities";
import { DeleteCronJobDialog } from "./DeleteCronJobDialog";

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
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Disabled}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  cronJob,
  onViewClick,
  onEditClick,
}: {
  cronJob: CronJob;
  onViewClick: (cronJob: CronJob) => void;
  onEditClick: (cronJob: CronJob) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(cronJob);
        }}>
        View
      </Button>

      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(cronJob);
        }}>
        Edit
      </Button>

      <DeleteCronJobDialog
        cronJobId={cronJob.id}
        cronJobTitle={cronJob.title}
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
      </DeleteCronJobDialog>
    </div>
  );
};

export const createColumns = (
  onViewClick: (cronJob: CronJob) => void,
  onEditClick: (cronJob: CronJob) => void,
): ColumnDef<CronJob>[] => [
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
    accessorKey: "when",
    header: "When",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("when")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "logs",
    header: "Logs",
    cell: ({ row }) => <div>{row.getValue("logs")}</div>,
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
      const cronJob = row.original;
      return (
        <ActionButtons
          cronJob={cronJob}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

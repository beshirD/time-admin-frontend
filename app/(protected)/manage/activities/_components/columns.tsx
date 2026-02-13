"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";

import { Activity } from "@/types/entities";
import { DeleteActivityDialog } from "./DeleteActivityDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  activity,
  onViewClick,
}: {
  activity: Activity;
  onViewClick: (activity: Activity) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="view"
        onClick={(e) => {
          e.stopPropagation();
          onViewClick(activity);
        }}>
        View
      </Button>

      <DeleteActivityDialog
        activityId={activity.id}
        activityContent={activity.content}
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
      </DeleteActivityDialog>
    </div>
  );
};

export const createColumns = (
  onViewClick: (activity: Activity) => void,
): ColumnDef<Activity>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.getValue("content") as string;
      return (
        <div
          className="max-w-md truncate"
          title={content}>
          {content}
        </div>
      );
    },
  },
  {
    accessorKey: "userIp",
    header: "User IP",
    cell: ({ row }) => <div>{row.getValue("userIp")}</div>,
  },
  {
    accessorKey: "userAgent",
    header: "User Agent",
    cell: ({ row }) => <div>{row.getValue("userAgent")}</div>,
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
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const activity = row.original;
      return (
        <ActionButtons
          activity={activity}
          onViewClick={onViewClick}
        />
      );
    },
  },
];

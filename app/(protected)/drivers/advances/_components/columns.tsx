"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileText, Trash2 } from "lucide-react";
import { DriverAdvance } from "@/types/entities";

// Status badge component
const StatusBadge = ({ status }: { status: DriverAdvance["status"] }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Settled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  advance,
  onSettle,
  onDelete,
}: {
  advance: DriverAdvance;
  onSettle: (advance: DriverAdvance) => void;
  onDelete: (advance: DriverAdvance) => void;
}) => {
  const handleSettle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSettle(advance);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(advance);
  };

  return (
    <div className="flex items-center gap-4">
      {advance.status === "Active" && (
        <button
          onClick={handleSettle}
          className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md transition-colors flex items-center gap-1">
          <FileText className="h-3 w-3" />
          Create Settlement
        </button>
      )}
      <button
        onClick={handleDelete}
        className="px-3 py-1.5 text-sm font-medium border-red-700 border-2 text-red-500 bg-red-600/10 rounded-md transition-colors flex items-center gap-1">
        <Trash2 className="h-3 w-3" />
        Delete
      </button>
    </div>
  );
};

export const createColumns = (
  onSettle: (advance: DriverAdvance) => void,
  onDelete: (advance: DriverAdvance) => void,
): ColumnDef<DriverAdvance>[] => [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "driverName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Driver
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const advance = row.original;
      return (
        <a
          href={`/drivers/advances/${advance.id}`}
          className=""
          onClick={(e) => e.stopPropagation()}>
          {row.getValue("driverName")}
        </a>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="text-gray-900 dark:text-gray-100">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "advanceAmount",
    header: "Advance Amount",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        AFN {row.getValue<number>("advanceAmount").toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const advance = row.original;
      return (
        <ActionButtons
          advance={advance}
          onSettle={onSettle}
          onDelete={onDelete}
        />
      );
    },
  },
];

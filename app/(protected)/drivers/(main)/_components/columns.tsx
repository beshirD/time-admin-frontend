"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
import { Driver } from "@/types/entities";
import { toast } from "sonner";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({ driver }: { driver: Driver }) => {
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Driver ${driver.fullName} has been approved!`);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.error(`Driver ${driver.fullName} has been rejected!`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleApprove}
        className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 rounded-md transition-colors">
        Approve
      </button>
      <button
        onClick={handleReject}
        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 rounded-md transition-colors">
        Reject
      </button>
      <Link
        href={`/drivers/${driver.id}`}
        onClick={(e) => e.stopPropagation()}>
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors flex items-center gap-1">
          <Eye className="h-3 w-3" />
          Details
        </button>
      </Link>
    </div>
  );
};

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Full Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
    cell: ({ row }) => <div>{row.getValue("contactNo")}</div>,
  },
  {
    accessorKey: "stateId",
    header: "State Id",
    cell: ({ row }) => <StatusBadge status={row.getValue("stateId")} />,
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
    accessorKey: "createdById",
    header: "Created By Id",
    cell: ({ row }) => <div>{row.getValue("createdById")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const driver = row.original;
      return <ActionButtons driver={driver} />;
    },
  },
];

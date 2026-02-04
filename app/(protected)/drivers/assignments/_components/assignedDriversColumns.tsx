"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { AssignedDriver } from "@/types/entities";
import Image from "next/image";

interface AssignedDriverColumnProps {
  onReassign: (driver: AssignedDriver) => void;
  onCancel: (driver: AssignedDriver) => void;
}

export const createAssignedDriversColumns = ({
  onReassign,
  onCancel,
}: AssignedDriverColumnProps): ColumnDef<AssignedDriver>[] => [
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            {driver.profilePicture ? (
              <Image
                src={driver.profilePicture}
                alt={driver.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold text-sm">
                {driver.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {driver.fullName}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {driver.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="flex">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "contactNo",
    header: "Contact",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("contactNo")}</div>
    ),
  },
  {
    accessorKey: "stateId",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("stateId") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
          }`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Assigned To
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("assignedTo")}</div>
    ),
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Joined
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("joinedDate")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReassign(driver);
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md transition-colors">
            Reassign
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel(driver);
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 rounded-md transition-colors">
            Cancel
          </button>
        </div>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Manager } from "@/types/entities";
import Image from "next/image";

export const managersColumns: ColumnDef<Manager>[] = [
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const manager = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            {manager.profilePicture ? (
              <Image
                src={manager.profilePicture}
                alt={manager.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {manager.fullName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {manager.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "assignedDrivers",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Assigned Drivers
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("assignedDrivers")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}>
            {status === "high" ? "High Load" : "Low Load"}
          </span>
        </div>
      );
    },
  },
];

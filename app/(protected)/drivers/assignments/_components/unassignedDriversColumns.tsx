"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UnassignedDriver } from "@/types/entities";
import Image from "next/image";

interface UnassignedDriverColumnProps {
  onAssign: (driver: UnassignedDriver) => void;
}

export const createUnassignedDriversColumns = ({
  onAssign,
}: UnassignedDriverColumnProps): ColumnDef<UnassignedDriver>[] => [
  {
    accessorKey: "profile",
    header: "Profile",
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
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAssign(driver);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md transition-colors">
          Assign
        </button>
      );
    },
  },
];

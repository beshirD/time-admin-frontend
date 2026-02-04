"use client";

import { DataTable } from "@/components/shared/DataTable";
import { managersColumns } from "./managersColumns";
import { createUnassignedDriversColumns } from "./unassignedDriversColumns";
import { Manager, UnassignedDriver } from "@/types/entities";

interface AssignmentsTabContentProps {
  managersData: Manager[];
  unassignedDriversData: UnassignedDriver[];
  onAssign: (driver: UnassignedDriver) => void;
}

export default function AssignmentsTabContent({
  managersData,
  unassignedDriversData,
  onAssign,
}: AssignmentsTabContentProps) {
  const unassignedDriversColumns = createUnassignedDriversColumns({
    onAssign,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Managers Section */}
      <div className="space-y-3 bg-white dark:bg-gray-900 rounded-lg border p-5">
        <h2 className="text-lg font-semibold">Available Managers</h2>
        <div className="overflow-hidden">
          <DataTable
            columns={managersColumns}
            data={managersData}
            searchPlaceholder="Search managers..."
            searchableColumns={["fullName", "email"]}
            enableColumnVisibility={false}
            scrollableContainer={true}
            maxHeight="600px"
            stickyHeader={true}
            hasPagination={false}
            detailsLink="/drivers/assignments/managers"
          />
        </div>
      </div>

      {/* Unassigned Drivers Section */}
      <div className="space-y-3 bg-white dark:bg-gray-900 rounded-lg border p-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Unassigned Drivers
        </h2>
        <div className="overflow-hidden">
          <DataTable
            columns={unassignedDriversColumns}
            data={unassignedDriversData}
            searchPlaceholder="Search drivers..."
            searchableColumns={["fullName", "email"]}
            enableColumnVisibility={false}
            scrollableContainer={true}
            maxHeight="600px"
            stickyHeader={true}
          />
        </div>
      </div>
    </div>
  );
}

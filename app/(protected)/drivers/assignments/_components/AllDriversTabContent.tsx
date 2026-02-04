"use client";

import { DataTable } from "@/components/shared/DataTable";
import { createAssignedDriversColumns } from "./assignedDriversColumns";
import { AssignedDriver } from "@/types/entities";

interface AllDriversTabContentProps {
  assignedDriversData: AssignedDriver[];
  onReassign: (driver: AssignedDriver) => void;
  onCancel: (driver: AssignedDriver) => void;
}

export default function AllDriversTabContent({
  assignedDriversData,
  onReassign,
  onCancel,
}: AllDriversTabContentProps) {
  const assignedDriversColumns = createAssignedDriversColumns({
    onReassign,
    onCancel,
  });

  return (
    <div className="space-y-3 bg-white dark:bg-gray-900 rounded-lg border p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        All Assigned Drivers
      </h2>
      <div className="overflow-hidden">
        <DataTable
          columns={assignedDriversColumns}
          data={assignedDriversData}
          searchPlaceholder="Search by driver name, email, contact, assigned manager..."
          searchableColumns={["fullName", "email", "contactNo", "assignedTo"]}
          enableColumnVisibility={true}
          scrollableContainer={true}
          // maxHeight="800px"
          stickyHeader={true}
        />
      </div>
    </div>
  );
}

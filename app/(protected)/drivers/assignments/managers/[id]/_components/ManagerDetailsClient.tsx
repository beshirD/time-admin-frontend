"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createManagerDriversColumns } from "./managerDriversColumns";
import { AssignedDriver, Manager } from "@/types/entities";
import AssignDriverModal from "../../../_components/AssignDriverModal";
import { CancelAssignmentDialog } from "../../../_components/CancelAssignmentDialog";

interface ManagerDetailsClientProps {
  assignedDrivers: AssignedDriver[];
  allManagers: Manager[];
  managerId: number;
}

export default function ManagerDetailsClient({
  assignedDrivers,
  allManagers,
  managerId,
}: ManagerDetailsClientProps) {
  const [selectedDriver, setSelectedDriver] = useState<AssignedDriver | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [driverToCancel, setDriverToCancel] = useState<AssignedDriver | null>(
    null,
  );

  const handleReassign = (driver: AssignedDriver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleCancelClick = (driver: AssignedDriver) => {
    setDriverToCancel(driver);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    // Handle the actual cancellation logic here
    console.log("Assignment cancelled");
    setIsCancelDialogOpen(false);
    setDriverToCancel(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const columns = createManagerDriversColumns({
    onReassign: handleReassign,
    onCancel: handleCancelClick,
  });

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Assigned Drivers (Total : {assignedDrivers.length})
        </h2>
        <div className="overflow-hidden ">
          <DataTable
            columns={columns}
            data={assignedDrivers}
            searchPlaceholder="Search drivers..."
            searchableColumns={["fullName", "email", "contactNo"]}
            enableColumnVisibility={false}
            // scrollableContainer={true}
            maxHeight="600px"
            stickyHeader={true}
          />
        </div>
      </div>

      {/* Reassign Modal */}
      {selectedDriver && (
        <AssignDriverModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          driver={selectedDriver}
          managers={allManagers}
          excludeManagerId={managerId}
        />
      )}

      {/* Cancel Assignment Dialog */}
      <CancelAssignmentDialog
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        driver={driverToCancel}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
}

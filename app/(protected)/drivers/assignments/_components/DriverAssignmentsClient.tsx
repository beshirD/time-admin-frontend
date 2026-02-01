"use client";

import { useState } from "react";
import { Manager, UnassignedDriver, AssignedDriver } from "@/types/entities";
import AssignDriverModal from "./AssignDriverModal";
import { CancelAssignmentDialog } from "./CancelAssignmentDialog";
import AssignmentsTabContent from "./AssignmentsTabContent";
import AllDriversTabContent from "./AllDriversTabContent";

interface DriverAssignmentsClientProps {
  activeTab: string;
  managersData: Manager[];
  unassignedDriversData: UnassignedDriver[];
  assignedDriversData: AssignedDriver[];
}

export default function DriverAssignmentsClient({
  activeTab,
  managersData,
  unassignedDriversData,
  assignedDriversData,
}: DriverAssignmentsClientProps) {
  const [selectedDriver, setSelectedDriver] = useState<
    UnassignedDriver | AssignedDriver | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [driverToCancel, setDriverToCancel] = useState<AssignedDriver | null>(
    null,
  );
  const [excludeManagerId, setExcludeManagerId] = useState<number | undefined>(
    undefined,
  );

  const handleAssign = (driver: UnassignedDriver) => {
    setSelectedDriver(driver);
    setExcludeManagerId(undefined);
    setIsModalOpen(true);
  };

  const handleReassign = (driver: AssignedDriver) => {
    setSelectedDriver(driver);
    setExcludeManagerId(driver.assignedToId);
    setIsModalOpen(true);
  };

  const handleCancelClick = (driver: AssignedDriver) => {
    setDriverToCancel(driver);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    // Handle the actual cancellation logic here
    console.log("Assignment cancelled");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
    setExcludeManagerId(undefined);
  };

  return (
    <>
      {/* Tab Content */}
      {activeTab === "assignments" ? (
        <AssignmentsTabContent
          managersData={managersData}
          unassignedDriversData={unassignedDriversData}
          onAssign={handleAssign}
        />
      ) : (
        <AllDriversTabContent
          assignedDriversData={assignedDriversData}
          onReassign={handleReassign}
          onCancel={handleCancelClick}
        />
      )}

      {/* Assignment Modal */}
      <AssignDriverModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        driver={selectedDriver}
        managers={managersData}
        excludeManagerId={excludeManagerId}
      />

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

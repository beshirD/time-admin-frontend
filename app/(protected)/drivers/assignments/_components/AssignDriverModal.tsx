"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { Manager, UnassignedDriver } from "@/types/entities";
import { toast } from "sonner";

interface AssignDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: UnassignedDriver | { fullName: string; id: number } | null;
  managers: Manager[];
  excludeManagerId?: number;
}

export default function AssignDriverModal({
  isOpen,
  onClose,
  driver,
  managers,
  excludeManagerId,
}: AssignDriverModalProps) {
  const [selectedManagerId, setSelectedManagerId] = useState<number | null>(
    null,
  );

  // Filter out the excluded manager (for reassignment)
  const availableManagers = excludeManagerId
    ? managers.filter((m) => m.id !== excludeManagerId)
    : managers;

  const handleAssign = () => {
    if (!selectedManagerId) {
      toast.error("Please select a manager");
      return;
    }

    const selectedManager = managers.find((m) => m.id === selectedManagerId);
    if (selectedManager && driver) {
      toast.success(
        `Assigned ${driver.fullName} to ${selectedManager.fullName}`,
      );
      onClose();
      setSelectedManagerId(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Driver to Manager"
      hideTitle={true}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-[500px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8">
        <div className="mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Assign Driver to Manager
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a manager to assign <strong>{driver?.fullName}</strong> to.
          </p>
        </div>

        <div className="mb-6">
          <Label>Select Manager</Label>
          <div className="mt-2 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {availableManagers.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No available managers to assign
              </div>
            ) : (
              availableManagers.map((manager) => (
                <div
                  key={manager.id}
                  onClick={() => setSelectedManagerId(manager.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedManagerId === manager.id
                      ? "border-primary bg-primary/15"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {manager.fullName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {manager.email}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {manager.assignedDrivers} drivers
                      </div>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          manager.status === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                        {manager.status === "high" ? "High Load" : "Low Load"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleAssign}>
            Assign Driver
          </Button>
        </div>
      </div>
    </Modal>
  );
}

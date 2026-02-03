"use client";

import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import { AvailabilitySelector } from "@/components/ui/AvailabilitySelector";

interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

// Mock data - using Record format for AvailabilitySelector
const mockAvailability: Record<string, DaySchedule> = {
  Sunday: { enabled: false, openTime: "10:00", closeTime: "20:00" },
  Monday: { enabled: true, openTime: "09:00", closeTime: "22:00" },
  Tuesday: { enabled: true, openTime: "09:00", closeTime: "22:00" },
  Wednesday: { enabled: true, openTime: "09:00", closeTime: "22:00" },
  Thursday: { enabled: true, openTime: "09:00", closeTime: "22:00" },
  Friday: { enabled: true, openTime: "09:00", closeTime: "23:00" },
  Saturday: { enabled: true, openTime: "10:00", closeTime: "23:00" },
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function AvailabilitySection() {
  const [availability, setAvailability] =
    useState<Record<string, DaySchedule>>(mockAvailability);
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Saving availability...", availability);
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Restaurant Availability
        </h3>
        <Button
          size="sm"
          onClick={openModal}>
          Edit Schedule
        </Button>
      </div>

      <div className="space-y-3">
        {DAYS.map((day) => {
          const schedule = availability[day];
          return (
            <div
              key={day}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-800 dark:text-white w-24">
                  {day}
                </span>
                {schedule?.enabled ? (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {schedule.openTime} - {schedule.closeTime}
                  </span>
                ) : (
                  <span className="text-sm text-red-600 dark:text-red-400">
                    Closed
                  </span>
                )}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  schedule?.enabled
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                }`}>
                {schedule?.enabled ? "Open" : "Closed"}
              </span>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[800px] m-4">
        <div className="no-scrollbar relative w-full max-w-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Availability Schedule
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Set your restaurant's operating hours for each day of the week.
            </p>
          </div>
          <div className="px-2">
            <AvailabilitySelector
              value={availability}
              onChange={setAvailability}
            />
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

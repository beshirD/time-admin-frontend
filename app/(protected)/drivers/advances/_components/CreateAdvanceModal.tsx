"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { Driver } from "@/types/entities";

interface CreateAdvanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  drivers: Driver[];
  onSubmit: (data: {
    driverId: number;
    driverName: string;
    date: Date;
    amount: number;
  }) => void;
}

export default function CreateAdvanceModal({
  isOpen,
  onClose,
  drivers,
  onSubmit,
}: CreateAdvanceModalProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Filter drivers based on search query
  const filteredDrivers = drivers.filter((driver) =>
    driver.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = () => {
    // Validation
    if (!selectedDriver) {
      toast.error("Please select a driver");
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    onSubmit({
      driverId: selectedDriver.id,
      driverName: selectedDriver.fullName,
      date: selectedDate,
      amount: parseFloat(amount),
    });

    // Reset form
    setSelectedDriver(null);
    setSelectedDate(undefined);
    setAmount("");
    setSearchQuery("");
    onClose();
  };

  const handleClose = () => {
    setSelectedDriver(null);
    setSelectedDate(undefined);
    setAmount("");
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Driver Advance"
      hideTitle={true}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-[500px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8">
        <div className="mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create Driver Advance
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fill in the details to create a new advance for a driver.
          </p>
        </div>

        {/* Driver Selection */}
        <div className="mb-6">
          <Label>
            Select Driver <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2">
            {/* Search Input */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Selected Driver Display */}
            {selectedDriver && (
              <div className="mb-2 p-3 rounded-lg border-2 border-primary bg-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {selectedDriver.fullName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedDriver.email}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="text-xs text-primary hover:underline">
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* Driver List */}
            {!selectedDriver && (
              <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                {filteredDrivers.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No drivers found
                  </div>
                ) : (
                  filteredDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      onClick={() => setSelectedDriver(driver)}
                      className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {driver.fullName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {driver.email}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <Label>
            Date <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2 relative">
            <button
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <CalendarIcon className="h-4 w-4" />
              {selectedDate ? (
                <span>{format(selectedDate, "MMM dd, yyyy")}</span>
              ) : (
                <span>Select date</span>
              )}
            </button>

            {isCalendarOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <Label>
            Amount (AFN) <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2"
            min="0"
            step={0.01}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}>
            Create Advance
          </Button>
        </div>
      </div>
    </Modal>
  );
}

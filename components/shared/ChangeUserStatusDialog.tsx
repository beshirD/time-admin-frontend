"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Modal } from "@/components/ui/modal";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import type { UserStatus } from "@/types/user";
import { Switch } from "@/components/ui/switch";

interface ChangeUserStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: StatusChangeDetails) => void;
  userName: string;
  currentStatus: UserStatus;
  isLoading?: boolean;
}

export interface StatusChangeDetails {
  newStatus: UserStatus;
  reason: string;
  durationDays?: number;
  banUntil?: string;
  notifyUser: boolean;
  notificationMessage?: string;
}

const AVAILABLE_STATUSES: {
  value: UserStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "ACTIVE",
    label: "Active",
    description: "User can access their account",
  },
  {
    value: "INACTIVE",
    label: "Inactive",
    description: "User account is temporarily disabled",
  },
  {
    value: "BANNED",
    label: "Ban",
    description: "User is permanently or temporarily banned",
  },
];

export function ChangeUserStatusDialog({
  isOpen,
  onClose,
  onConfirm,
  userName,
  currentStatus,
  isLoading = false,
}: ChangeUserStatusDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);
  const [formData, setFormData] = useState({
    reason: "",
    durationDays: "",
    banUntil: "",
    notifyUser: true,
    notificationMessage: "",
  });

  const handleClose = () => {
    setStep(1);
    setSelectedStatus(null);
    setFormData({
      reason: "",
      durationDays: "",
      banUntil: "",
      notifyUser: true,
      notificationMessage: "",
    });
    onClose();
  };

  const handleNext = () => {
    if (selectedStatus) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;

    const details: StatusChangeDetails = {
      newStatus: selectedStatus,
      reason: formData.reason,
      notifyUser: formData.notifyUser,
    };

    // Add optional fields based on status
    if (selectedStatus === "BANNED") {
      if (formData.durationDays) {
        details.durationDays = parseInt(formData.durationDays);
      }
      if (formData.banUntil) {
        details.banUntil = new Date(formData.banUntil).toISOString();
      }
    }

    if (formData.notifyUser && formData.notificationMessage) {
      details.notificationMessage = formData.notificationMessage;
    }

    onConfirm(details);
  };

  const getActionLabel = () => {
    switch (selectedStatus) {
      case "ACTIVE":
        return "Activate User";
      case "INACTIVE":
        return "Deactivate User";
      case "BANNED":
        return "Ban User";
      default:
        return "Change Status";
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "border-success-500 bg-success-50 dark:bg-success-900/20";
      case "INACTIVE":
        return "border-warning-500 bg-warning-50 dark:bg-warning-900/20";
      case "BANNED":
        return "border-error-500 bg-error-50 dark:bg-error-900/20";
      default:
        return "border-gray-300 bg-gray-50 dark:bg-gray-800";
    }
  };

  // Filter out current status from available options
  const availableStatuses = AVAILABLE_STATUSES.filter(
    (s) => s.value !== currentStatus && s.value !== "PENDING",
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change User Status"
      hideTitle={true}
      className="max-w-[600px] m-4">
      <div className="no-scrollbar relative h-full w-[600px] border overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-9">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Change User Status
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {step === 1
              ? "Select a new status for this user"
              : "Provide details for the status change"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-2">
          {/* Step 1: Select New Status */}
          {step === 1 && (
            <>
              {/* Current Status Display */}
              <div>
                <Label>Current Status</Label>
                <div className="mt-2 p-4 rounded-lg border-2 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {userName}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {currentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Select New Status */}
              <div>
                <Label>
                  Select New Status <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2 space-y-3">
                  {availableStatuses.map((status) => (
                    <div
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedStatus === status.value
                          ? getStatusColor(status.value)
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800 dark:text-white">
                            {status.label}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {status.description}
                          </p>
                        </div>
                        {selectedStatus === status.value && (
                          <CheckCircle2 className="h-5 w-5 text-primary ml-3 shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleClose}
                  className="flex-1">
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedStatus}
                  className="flex-1">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Enter Details */}
          {step === 2 && selectedStatus && (
            <>
              {/* Status Change Summary */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Changing status to:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedStatus}
                  </span>
                </div>
              </div>

              {/* Reason */}
              <div>
                <Label htmlFor="reason">
                  Reason <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  placeholder="Explain why you are changing this user's status..."
                  className="flex h-24 w-full rounded-md border-2 border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus:border-primary resize-none"
                />
              </div>

              {/* Duration and Ban Until (only for BANNED status) */}
              {selectedStatus === "BANNED" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="durationDays">Duration (Days)</Label>
                      <Input
                        id="durationDays"
                        type="number"
                        min="1"
                        value={formData.durationDays}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            durationDays: e.target.value,
                          })
                        }
                        placeholder="e.g., 7"
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Leave empty for permanent ban
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="banUntil">Ban Until Date</Label>
                      <div className="mt-2">
                        <Calendar
                          mode="single"
                          selected={
                            formData.banUntil
                              ? new Date(formData.banUntil)
                              : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              setFormData({
                                ...formData,
                                banUntil: date.toISOString(),
                              });
                            } else {
                              setFormData({ ...formData, banUntil: "" });
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Select when the ban should end
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Notify User */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <Label
                    htmlFor="notifyUser"
                    className="cursor-pointer">
                    Notify User
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Send notification about status change
                  </p>
                </div>
                <Switch
                  id="notifyUser"
                  checked={formData.notifyUser}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifyUser: checked })
                  }
                />
              </div>

              {/* Notification Message (if notify is enabled) */}
              {formData.notifyUser && (
                <div>
                  <Label htmlFor="notificationMessage">
                    Notification Message
                  </Label>
                  <textarea
                    id="notificationMessage"
                    value={formData.notificationMessage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        notificationMessage: e.target.value,
                      })
                    }
                    placeholder="Custom message to send to the user..."
                    className="flex h-20 w-full rounded-md border-2 border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus:border-primary resize-none"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Optional custom message
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="flex-1">
                  Back
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={isLoading || !formData.reason}
                  className="flex-1">
                  {isLoading ? "Processing..." : getActionLabel()}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}

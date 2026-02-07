"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface BanUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm?: (data: BanUserData) => void;
}

export interface BanUserData {
  reason: string;
  durationDays: number;
  banUntil: string;
  notifyUser: boolean;
  notificationMessage: string;
}

export function BanUserDialog({
  isOpen,
  onClose,
  userName,
  onConfirm,
}: BanUserDialogProps) {
  const [reason, setReason] = useState("");
  const [durationDays, setDurationDays] = useState("0");
  const [banUntilDate, setBanUntilDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [notifyUser, setNotifyUser] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSubmit = () => {
    const data: BanUserData = {
      reason,
      durationDays: Number(durationDays),
      banUntil: banUntilDate?.toISOString() || new Date().toISOString(),
      notifyUser,
      notificationMessage,
    };
    onConfirm?.(data);
    console.log("Ban user data:", data);
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setReason("");
    setDurationDays("0");
    setBanUntilDate(undefined);
    setNotifyUser(true);
    setNotificationMessage("");
    setIsCalendarOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ban User"
      hideTitle={true}
      className="max-w-[600px] m-4 ">
      <div className="no-scrollbar border relative w-[550px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ban User
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Ban <span className="font-semibold">{userName}</span> from accessing
            the platform.
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="space-y-5">
              {/* Reason */}
              <div>
                <Label>Reason for Ban *</Label>
                <Textarea
                  placeholder="Enter the reason for banning this user..."
                  value={reason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setReason(e.target.value)
                  }
                  rows={3}
                  required
                />
              </div>

              {/* Duration Days */}
              <div>
                <Label>Duration (Days)</Label>
                <Input
                  type="number"
                  placeholder="Enter number of days (0 for permanent)"
                  value={durationDays}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDurationDays(e.target.value)
                  }
                  min="0"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Leave as 0 for permanent ban
                </p>
              </div>

              {/* Ban Until Date */}
              <div>
                <Label>Ban Until Date</Label>
                <div className="mt-2 relative">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="w-full inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <CalendarIcon className="h-4 w-4" />
                    {banUntilDate ? (
                      <span>{format(banUntilDate, "MMM dd, yyyy")}</span>
                    ) : (
                      <span>Select date</span>
                    )}
                  </button>

                  {isCalendarOpen && (
                    <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                      <Calendar
                        mode="single"
                        selected={banUntilDate}
                        onSelect={(date) => {
                          setBanUntilDate(date);
                          setIsCalendarOpen(false);
                        }}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Select the date when the ban should end
                </p>
              </div>

              {/* Notify User */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="notifyUser"
                  checked={notifyUser}
                  onChange={(checked: boolean) => setNotifyUser(checked)}
                />
                <Label
                  htmlFor="notifyUser"
                  className="cursor-pointer">
                  Notify user about this action
                </Label>
              </div>

              {/* Notification Message */}
              {notifyUser && (
                <div>
                  <Label>Notification Message</Label>
                  <Textarea
                    placeholder="Enter a custom message for the user..."
                    value={notificationMessage}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNotificationMessage(e.target.value)
                    }
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!reason}
              className="bg-error-500 hover:bg-error-600">
              Ban User
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

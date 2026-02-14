"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { CronJobLog } from "@/types/entities";

interface LogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  log?: CronJobLog | null;
  onSuccess?: () => void;
}

// Mock cron jobs for dropdown
const mockCronJobs = [
  { id: 10, label: "10:sitemap/sync:20 2 * * *" },
  { id: 9, label: "9:/email-queue/clear:* * * * *" },
  { id: 8, label: "8:/email-queue/send:* * * * *" },
  { id: 7, label: "7:backup/timer:20 2 * * *" },
  { id: 6, label: "6:/contact/information/mark-spam:* * * * *" },
  { id: 5, label: "5:clear/debug:0 * * * *" },
  { id: 4, label: "4:clear/runtime:20 2 * * *" },
  { id: 3, label: "3:clear/history:20 2 * * *" },
];

export function LogDialog({ isOpen, onClose, log, onSuccess }: LogDialogProps) {
  const [formData, setFormData] = useState({
    state: "Pending",
    cronjob: "",
  });
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (log) {
      setFormData({
        state: log.state,
        cronjob: log.cronjob,
      });
      // Parse the scheduled date if available
      if (log.scheduledOn) {
        setScheduledDate(new Date(log.scheduledOn));
      }
    } else {
      setFormData({
        state: "Pending",
        cronjob: "",
      });
      setScheduledDate(undefined);
    }
  }, [log, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(
      log ? "Log updated successfully" : "Log created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      state: "Pending",
      cronjob: "",
    });
    setScheduledDate(undefined);
    setIsCalendarOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[600px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {log ? "Edit Log" : "Add New Log"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {log
              ? "Update log information."
              : "Add a new log entry to the scheduler."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3 space-y-5">
            {/* State */}
            <div>
              <Label htmlFor="state">
                State <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In-Progress">In-Progress</SelectItem>
                  <SelectItem value="Deleted">Deleted</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cronjob */}
            <div>
              <Label htmlFor="cronjob">
                Cronjob <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={formData.cronjob}
                onValueChange={(value) =>
                  setFormData({ ...formData, cronjob: value })
                }>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select cronjob" />
                </SelectTrigger>
                <SelectContent>
                  {mockCronJobs.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.label}>
                      {job.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scheduled On - Calendar */}
            <div>
              <Label htmlFor="scheduledOn">
                Scheduled On <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <CalendarIcon className="h-4 w-4" />
                  {scheduledDate ? (
                    <span>
                      {format(scheduledDate, "MMM dd, yyyy, hh:mm:ss a")}
                    </span>
                  ) : (
                    <span>Select date and time</span>
                  )}
                </button>

                {isCalendarOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={(selectedDate) => {
                        setScheduledDate(selectedDate);
                        setIsCalendarOpen(false);
                      }}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit">
              {log ? "Update Log" : "Add Log"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

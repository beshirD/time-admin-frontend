"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/Input";
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
import { CronJob, CronJobType } from "@/types/entities";

interface CronJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cronJob?: CronJob | null;
  onSuccess?: () => void;
}

// Mock cron job types
const mockCronJobTypes: CronJobType[] = [
  { id: 1, name: "check 121" },
  { id: 2, name: "backup" },
  { id: 3, name: "email" },
  { id: 4, name: "cleanup" },
];

export function CronJobDialog({
  isOpen,
  onClose,
  cronJob,
  onSuccess,
}: CronJobDialogProps) {
  const [formData, setFormData] = useState({
    command: "",
    title: "",
    when: "",
    type: "",
    state: "Active",
  });
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (cronJob) {
      setFormData({
        command: cronJob.command,
        title: cronJob.title,
        when: cronJob.when,
        type: cronJob.type,
        state: cronJob.state,
      });
    } else {
      setFormData({
        command: "",
        title: "",
        when: "",
        type: "",
        state: "Active",
      });
      setDate(undefined);
    }
  }, [cronJob, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For now, just show success toast
    toast.success(
      cronJob
        ? "Cron job updated successfully"
        : "Cron job created successfully",
    );
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setFormData({
      command: "",
      title: "",
      when: "",
      type: "",
      state: "Active",
    });
    setDate(undefined);
    setIsCalendarOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {cronJob ? "Edit Cron Job" : "Create New Cron Job"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {cronJob
              ? "Update cron job information."
              : "Add a new cron job to the scheduler."}
          </p>
        </div>

        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
            <div className="space-y-5">
              {/* Command */}
              <div>
                <Label htmlFor="command">
                  Command <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="command"
                  type="text"
                  required
                  value={formData.command}
                  onChange={(e) =>
                    setFormData({ ...formData, command: e.target.value })
                  }
                  placeholder="e.g., sitemap/sync"
                />
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter cron job title"
                />
              </div>

              {/* When - Calendar */}
              <div>
                <Label htmlFor="when">
                  When <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <Input
                    id="when"
                    type="text"
                    required
                    value={formData.when}
                    onChange={(e) =>
                      setFormData({ ...formData, when: e.target.value })
                    }
                    placeholder="e.g., * * * * * or 20 2 * * *"
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? (
                        <span>{format(date, "MMM dd, yyyy")}</span>
                      ) : (
                        <span>Pick a date (optional)</span>
                      )}
                    </button>

                    {isCalendarOpen && (
                      <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            setIsCalendarOpen(false);
                          }}
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cron expression format: minute hour day month weekday
                  </p>
                </div>
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCronJobTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                    <SelectItem value="Deleted">Deleted</SelectItem>
                  </SelectContent>
                </Select>
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
              {cronJob ? "Update Cron Job" : "Create Cron Job"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

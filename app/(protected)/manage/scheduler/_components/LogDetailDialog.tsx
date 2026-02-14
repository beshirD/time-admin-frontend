"use client";

import { Modal } from "@/components/ui/modal";
import { CronJobLog } from "@/types/entities";
import Button from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import LogComments from "./LogComments";

interface LogDetailDialogProps {
  log: CronJobLog | null;
  isOpen: boolean;
  onClose: () => void;
  onClone: (log: CronJobLog) => void;
}

export function LogDetailDialog({
  log,
  isOpen,
  onClose,
  onClone,
}: LogDetailDialogProps) {
  if (!log) return null;

  const handleClone = () => {
    onClone(log);
    onClose();
  };

  // Extract cronjob details from the format "ID:command:schedule"
  const cronjobParts = log.cronjob.split(":");
  const cronjobId = cronjobParts[0];
  const cronjobCommand = cronjobParts.slice(1, -1).join(":");
  const cronjobSchedule = cronjobParts[cronjobParts.length - 1];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {log.id} : {log.scheduledOn} {`==>`} {cronjobCommand}
            </h4>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  log.state === "Pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : log.state === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : log.state === "Failed"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                }`}>
                {log.state}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Not Starred
              </span>
            </div>
          </div>

          {/* Clone Button */}
          <div className="px-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClone}
              startIcon={<Copy className="w-4 h-4" />}>
              Clone
            </Button>
          </div>
        </div>

        <div className="px-2 space-y-6">
          {/* Log Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.id}
              </p>
            </div>

            {/* Cronjob */}
            <div className="col-span-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Cronjob
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {log.cronjob}
              </p>
            </div>

            {/* Scheduled On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Scheduled On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.scheduledOn}
              </p>
            </div>

            {/* Executed On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Executed On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.executedOn || "—"}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.createdOn}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.createdBy}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <LogComments />
        </div>
      </div>
    </Modal>
  );
}

"use client";

import { Modal } from "@/components/ui/modal";
import { CronJob } from "@/types/entities";
import Button from "@/components/ui/Button";
import { Play, Copy } from "lucide-react";
import { toast } from "sonner";
import CronJobComments from "./CronJobComments";

interface CronJobDetailDialogProps {
  cronJob: CronJob | null;
  isOpen: boolean;
  onClose: () => void;
  onClone: (cronJob: CronJob) => void;
}

export function CronJobDetailDialog({
  cronJob,
  isOpen,
  onClose,
  onClone,
}: CronJobDetailDialogProps) {
  if (!cronJob) return null;

  const handleRun = () => {
    toast.success(`Running cron job: ${cronJob.title}`);
  };

  const handleClone = () => {
    onClone(cronJob);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="flex items-center justify-between">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cron Job Details
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              View detailed information about this cron job.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="px-2 mb-6 flex gap-3">
            <Button
              size="sm"
              onClick={handleRun}
              startIcon={<Play className="w-4 h-4" />}>
              Run
            </Button>
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
          {/* Cron Job Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cronJob.id}
              </p>
            </div>

            {/* When */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                When
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {cronJob.when}
              </p>
            </div>

            {/* Command */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Command
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cronJob.command}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cronJob.type}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cronJob.createdOn}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {cronJob.createdBy}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <CronJobComments />
        </div>
      </div>
    </Modal>
  );
}

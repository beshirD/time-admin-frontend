"use client";

import { Modal } from "@/components/ui/modal";
import { Activity } from "@/types/entities";
import ActivityComments from "./ActivityComments";

interface ActivityDetailDialogProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive}`}>
      {status}
    </span>
  );
};

export function ActivityDetailDialog({
  activity,
  isOpen,
  onClose,
}: ActivityDetailDialogProps) {
  if (!activity) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 flex items-center gap-4">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Activity Details
          </h4>
          {/* Status and Starred */}
          <StatusBadge status={activity.state} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Not Starred
          </span>
        </div>

        <div className="px-2 space-y-6 mt-2">
          {/* Activity Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.id}
              </p>
            </div>

            {/* Model Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Model Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.modelType}
              </p>
            </div>

            {/* User IP */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User IP
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.userIp}
              </p>
            </div>

            {/* User Agent */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User Agent
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.userAgent}
              </p>
            </div>

            {/* Model */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Model
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.model}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.type}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.createdOn}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.createdBy}
              </p>
            </div>
          </div>

          {/* Full Content Display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Full Activity Content
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {activity.content}
            </p>
          </div>

          {/* Comments Section */}
          <ActivityComments />
        </div>
      </div>
    </Modal>
  );
}

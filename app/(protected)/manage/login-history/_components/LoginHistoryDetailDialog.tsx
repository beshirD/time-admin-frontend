"use client";

import { Modal } from "@/components/ui/modal";
import { LoginHistory } from "@/types/entities";

interface LoginHistoryDetailDialogProps {
  history: LoginHistory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LoginHistoryDetailDialog({
  history,
  isOpen,
  onClose,
}: LoginHistoryDetailDialogProps) {
  if (!history) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14 mb-2">
          <div className="flex items-center gap-3 mt-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Logged-in: {history.user || "Unknown User"} : {history.state}
            </h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                history.state === "Success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}>
              {history.state}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Not Starred
            </span>
          </div>
        </div>

        <div className="px-2 space-y-6">
          {/* Login History Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.id}
              </p>
            </div>

            {/* User */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.userId || "—"}
              </p>
            </div>

            {/* User IP */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User IP
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {history.userIp}
              </p>
            </div>

            {/* User Agent */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User Agent
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                {history.userAgent}
              </p>
            </div>

            {/* Failure Reason */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Failure Reason
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.failureReason || "—"}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.type}
              </p>
            </div>

            {/* Code */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Code
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.code || "—"}
              </p>
            </div>

            {/* Create Time */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Create Time
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {history.createTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

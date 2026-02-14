"use client";

import { Modal } from "@/components/ui/modal";
import { ErrorLog } from "@/types/entities";

interface ErrorLogDetailDialogProps {
  errorLog: ErrorLog | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ErrorLogDetailDialog({
  errorLog,
  isOpen,
  onClose,
}: ErrorLogDetailDialogProps) {
  if (!errorLog) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[900px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[900px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14 mb-2">
          <div className="flex items-center gap-3 mt-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {errorLog.error}
            </h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                errorLog.state === "Active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
              }`}>
              {errorLog.state}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Not Starred
            </span>
          </div>
        </div>

        <div className="px-2 space-y-6">
          {/* Error Details Grid */}
          <div className="grid grid-cols-3 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.id}
              </p>
            </div>

            {/* Error */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Error
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.error}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.type}
              </p>
            </div>

            {/* User IP */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User IP
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {errorLog.userIp}
              </p>
            </div>

            {/* User */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                User
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.user}
              </p>
            </div>

            {/* Created On */}
            <div className="">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.createdOn}
              </p>
            </div>

            {/* Referer Link */}
            <div className="col-span-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Referer Link
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {errorLog.refererLink || "—"}
              </p>
            </div>

            {/* Link */}
            <div className="col-span-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Link
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 break-all">
                {errorLog.link}
              </p>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Additional Details
            </h5>

            <div className="space-y-3 text-sm grid grid-cols-3">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  User:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {errorLog.user}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Referer:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {errorLog.refererLink || "—"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Client:
                </span>{" "}
                <span className="text-gray-900 dark:text-white font-mono">
                  {errorLog.userIp}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Error:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {errorLog.error}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  User Agent:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {errorLog.userAgent || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Stack Trace Section */}
          {errorLog.stackTrace && (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Stack Trace
              </h5>
              <pre className="text-xs font-mono text-gray-800 dark:text-gray-300 whitespace-pre-wrap break-all">
                {errorLog.stackTrace}
              </pre>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

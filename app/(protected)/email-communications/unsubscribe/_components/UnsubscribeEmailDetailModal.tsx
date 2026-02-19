"use client";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import type { UnsubscribeEmail } from "@/types/entities";

interface UnsubscribeEmailDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: UnsubscribeEmail | null;
}

export function UnsubscribeEmailDetailModal({
  isOpen,
  onClose,
  email,
}: UnsubscribeEmailDetailModalProps) {
  if (!email) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4">
      <div className="relative border w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {email.email}
          </h4>
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                email.state === "Active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
              }`}>
              {email.state}
            </span>
          </div>
        </div>

        <div className="px-2 space-y-4">
          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              ID
            </span>
            <span className="text-gray-900 dark:text-white">{email.id}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Email
            </span>
            <span className="text-gray-900 dark:text-white">{email.email}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              State
            </span>
            <span className="text-gray-900 dark:text-white">{email.state}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Created On
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(email.createdOn).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Created By
            </span>
            <span className="text-gray-900 dark:text-white">
              {email.createdBy}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

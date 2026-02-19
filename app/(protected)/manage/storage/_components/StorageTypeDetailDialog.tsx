"use client";

import { Modal } from "@/components/ui/modal";
import { StorageType } from "@/types/entities";
import TypeComments from "./TypeComments";

interface StorageTypeDetailDialogProps {
  type: StorageType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StorageTypeDetailDialog({
  type,
  isOpen,
  onClose,
}: StorageTypeDetailDialogProps) {
  if (!type) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14 mb-6">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {type.title}
          </h4>
        </div>

        <div className="px-2 space-y-6">
          {/* Type Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {type.id}
              </p>
            </div>

            {/* Title */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Title
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {type.title}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {type.createdOn || "—"}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {type.createdBy || "Admins"}
              </p>
            </div>
          </div>

          {/* Description Section (if exists) */}
          {type.description && (
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {type.description}
              </p>
            </div>
          )}

          {/* Comments Section */}
          <TypeComments />
        </div>
      </div>
    </Modal>
  );
}

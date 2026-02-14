"use client";

import { Modal } from "@/components/ui/modal";
import { Page } from "@/types/entities";

interface PageDetailDialogProps {
  page: Page | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PageDetailDialog({
  page,
  isOpen,
  onClose,
}: PageDetailDialogProps) {
  if (!page) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Page Details
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            View detailed information about this page.
          </p>
        </div>

        <div className="px-2 space-y-6">
          {/* Page Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-base text-gray-800 dark:text-white/90">
                {page.id}
              </p>
            </div>

            {/* Title */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Title
              </p>
              <p className="text-base text-gray-800 dark:text-white/90">
                {page.title}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-base text-gray-800 dark:text-white/90">
                {page.type}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-base text-gray-800 dark:text-white/90">
                {page.createdOn}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Description
            </p>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: page.description }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

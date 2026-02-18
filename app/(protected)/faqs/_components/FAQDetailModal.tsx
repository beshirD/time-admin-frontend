"use client";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import type { FAQ } from "@/types/entities";

interface FAQDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq: FAQ | null;
}

export function FAQDetailModal({ isOpen, onClose, faq }: FAQDetailModalProps) {
  if (!faq) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="relative border w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            FAQ Details
          </h4>
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                faq.state === "Active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : faq.state === "Inactive"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}>
              {faq.state}
            </span>
          </div>
        </div>

        <div className="px-2 space-y-4">
          <div className="py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Question
            </span>
            <p className="text-gray-900 dark:text-white">{faq.question}</p>
          </div>

          <div className="py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Answer
            </span>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {faq.answer}
            </p>
          </div>

          <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Created On
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(faq.createdOn).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

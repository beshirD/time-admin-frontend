"use client";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import type { FAQ } from "@/types/entities";

interface FAQDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq: FAQ | null;
  onEdit?: (faq: FAQ) => void;
}

export function FAQDetailModal({
  isOpen,
  onClose,
  faq,
  onEdit,
}: FAQDetailModalProps) {
  if (!faq) return null;

  const translation = faq.translations[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="relative border w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar">
        <div className="px-2 pr-14">
          <div className="flex items-center gap-3">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              FAQ Details
            </h4>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                faq.active
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}>
              {faq.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="px-2 space-y-4 grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2 ">
            <span className=" text-gray-700 dark:text-gray-300">Category</span>
            <span className="text-gray-900 dark:text-white capitalize">
              {faq.category || "—"}
            </span>
          </div>

          {/* Display Order */}
          <div className="flex flex-col gap-2 ">
            <span className=" text-gray-700 dark:text-gray-300">
              Display Order
            </span>
            <span className="text-gray-900 dark:text-white">
              {faq.displayOrder}
            </span>
          </div>

          {/* Created At */}
          <div className="flex flex-col gap-2 ">
            <span className=" text-gray-700 dark:text-gray-300">
              Created At
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(faq.createdAt).toLocaleString("en-US", {
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

          {/* Updated At */}
          <div className="flex flex-col gap-2 ">
            <span className=" text-gray-700 dark:text-gray-300">
              Updated At
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(faq.updatedAt).toLocaleString("en-US", {
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
          {/* Question */}
          <div className="">
            <span className=" text-gray-700 dark:text-gray-300 block">
              Question
            </span>
            <p className="text-gray-900 dark:text-white">
              {translation?.question ?? "—"}
            </p>
          </div>

          {/* Answer */}
          <div className="py-3 col-span-2">
            <span className=" text-gray-700 dark:text-gray-300 block mb-2">
              Answer
            </span>
            <p className="text-gray-900 p-3 border rounded-md dark:text-white whitespace-pre-wrap">
              {translation?.answer ?? "—"}
            </p>
          </div>
        </div>

        {/* Actions */}
      </div>
    </Modal>
  );
}

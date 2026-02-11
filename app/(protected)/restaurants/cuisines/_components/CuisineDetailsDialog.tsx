"use client";

import { Modal } from "@/components/ui/modal";
import { Cuisine } from "@/types/entities";
import Image from "next/image";

interface CuisineDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cuisine: Cuisine | null;
}

export function CuisineDetailsDialog({
  isOpen,
  onClose,
  cuisine,
}: CuisineDetailsDialogProps) {
  if (!cuisine) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[100px] m-1">
      <div className="no-scrollbar relative border w-full lg:w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Cuisine Details
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            View detailed information about this cuisine.
          </p>
        </div>

        <div className="px-2 space-y-4">
          {/* Cuisine Image */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Image
            </label>
            <div className="mt-2 relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src={cuisine.image}
                alt={cuisine.title}
                fill
                className="object-cover"
                sizes="(max-width: 600px) 100vw, 600px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {cuisine.id}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Title
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {cuisine.title}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </label>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cuisine.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}>
                  {cuisine.status.charAt(0).toUpperCase() +
                    cuisine.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import { Modal } from "@/components/ui/modal";
import { StorageProvider } from "@/types/entities";
import Button from "@/components/ui/Button";
import { Copy, FileDown } from "lucide-react";
import { toast } from "sonner";
import ProviderComments from "./ProviderComments";

interface ProviderDetailDialogProps {
  provider: StorageProvider | null;
  isOpen: boolean;
  onClose: () => void;
  onClone: (provider: StorageProvider) => void;
}

export function ProviderDetailDialog({
  provider,
  isOpen,
  onClose,
  onClone,
}: ProviderDetailDialogProps) {
  if (!provider) return null;

  const handleClone = () => {
    onClone(provider);
    onClose();
  };

  const handleExport = () => {
    toast.success("Provider exported successfully");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] m-4">
      <div className="no-scrollbar border relative w-full lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {provider.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {provider.description ||
                `${provider.title} is done using next app`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="px-2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClone}
              startIcon={<Copy className="w-4 h-4" />}>
              Clone
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              startIcon={<FileDown className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        <div className="px-2 space-y-6">
          {/* Provider Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 border border-gray-200 rounded-2xl dark:border-gray-800 bg-white dark:bg-gray-800">
            {/* ID */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                ID
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.id}
              </p>
            </div>

            {/* Key */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Key
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {provider.key}
              </p>
            </div>

            {/* Secret */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Secret
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {provider.secret}
              </p>
            </div>

            {/* Endpoint */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Endpoint
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 break-all">
                {provider.endpoint}
              </p>
            </div>

            {/* Read Write */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Read Write
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.readWrite || "—"}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Location
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.location || "nas"}
              </p>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Type
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.type}
              </p>
            </div>

            {/* Created On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.createdOn}
              </p>
            </div>

            {/* Updated On */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Updated On
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.updatedOn || provider.createdOn}
              </p>
            </div>

            {/* Created By */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {provider.createdBy || "Admins"}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <ProviderComments />
        </div>
      </div>
    </Modal>
  );
}

"use client";

import { useState } from "react";
import { ProvidersTable } from "./ProvidersTable";
import { ProviderDialog } from "./ProviderDialog";
import { Database, FileText, FolderTree } from "lucide-react";

export function StorageContent() {
  const [isCreateProviderDialogOpen, setIsCreateProviderDialogOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState<"providers" | "files" | "types">(
    "providers",
  );

  return (
    <>
      <div className="flex flex-col min-w-full gap-5 mb-7">
        {/* Header with Tabs */}
        <div className="flex w-full rounded-lg bg-white dark:bg-gray-900 px-5 py-2 border items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Storage
            </h3>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Manage storage providers, files, and types
            </p>
          </div>
          {/* Tab Toggle */}
          <div className="flex gap-2 p-1 border bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("providers")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "providers"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <Database className="inline-block h-4 w-4 mr-2" />
              Providers
            </button>
            <button
              onClick={() => setActiveTab("files")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "files"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <FileText className="inline-block h-4 w-4 mr-2" />
              Files
            </button>
            <button
              onClick={() => setActiveTab("types")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "types"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <FolderTree className="inline-block h-4 w-4 mr-2" />
              Types
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
          {activeTab === "providers" && (
            <div className="w-full">
              <ProvidersTable
                onCreateClick={() => setIsCreateProviderDialogOpen(true)}
              />
            </div>
          )}

          {activeTab === "files" && (
            <div className="w-full p-8 text-center text-gray-500 dark:text-gray-400">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p>Files section coming soon...</p>
            </div>
          )}

          {activeTab === "types" && (
            <div className="w-full p-8 text-center text-gray-500 dark:text-gray-400">
              <FolderTree className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p>Types section coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <ProviderDialog
        isOpen={isCreateProviderDialogOpen}
        onClose={() => setIsCreateProviderDialogOpen(false)}
      />
    </>
  );
}

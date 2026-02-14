"use client";

import { useState } from "react";
import { CronJobsTable } from "./CronJobsTable";
import { CronJobDialog } from "./CronJobDialog";
import { LogsTable } from "./LogsTable";
import { LogDialog } from "./LogDialog";
import { TypesTable } from "./TypesTable";
import { TypeDialog } from "./TypeDialog";
import { Calendar, FileText, FolderTree } from "lucide-react";

export function SchedulerContent() {
  const [isCreateCronJobDialogOpen, setIsCreateCronJobDialogOpen] =
    useState(false);
  const [isCreateLogDialogOpen, setIsCreateLogDialogOpen] = useState(false);
  const [isCreateTypeDialogOpen, setIsCreateTypeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cronjobs" | "logs" | "types">(
    "cronjobs",
  );

  return (
    <>
      <div className="flex flex-col min-w-full gap-5 mb-7">
        {/* Header with Tabs */}
        <div className="flex w-full rounded-lg bg-white dark:bg-gray-900 px-5 py-2 border items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Scheduler
            </h3>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Manage cron jobs, logs, and job types
            </p>
          </div>
          {/* Tab Toggle */}
          <div className="flex gap-2 p-1 border bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("cronjobs")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "cronjobs"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <Calendar className="inline-block h-4 w-4 mr-2" />
              Cron Jobs
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "logs"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <FileText className="inline-block h-4 w-4 mr-2" />
              Logs
            </button>
            <button
              onClick={() => setActiveTab("types")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "types"
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}>
              <FolderTree className="inline-block h-4 w-4 mr-2" />
              Cron Job Types
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
          {activeTab === "cronjobs" && (
            <div className="w-full">
              <CronJobsTable
                onCreateClick={() => setIsCreateCronJobDialogOpen(true)}
              />
            </div>
          )}

          {activeTab === "logs" && (
            <div className="w-full">
              <LogsTable onCreateClick={() => setIsCreateLogDialogOpen(true)} />
            </div>
          )}

          {activeTab === "types" && (
            <div className="w-full">
              <TypesTable
                onCreateClick={() => setIsCreateTypeDialogOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      <CronJobDialog
        isOpen={isCreateCronJobDialogOpen}
        onClose={() => setIsCreateCronJobDialogOpen(false)}
      />

      <LogDialog
        isOpen={isCreateLogDialogOpen}
        onClose={() => setIsCreateLogDialogOpen(false)}
      />

      <TypeDialog
        isOpen={isCreateTypeDialogOpen}
        onClose={() => setIsCreateTypeDialogOpen(false)}
      />
    </>
  );
}

"use client";

import { useState, useRef } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import type { CronJob } from "@/types/entities";
import { CronJobDetailDialog } from "./CronJobDetailDialog";
import { CronJobDialog } from "./CronJobDialog";
import Button from "@/components/ui/Button";
import { FileUp, FileDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageTitle from "@/components/common/PageTitle";

// Mock data based on the provided sample
const mockCronJobs: CronJob[] = [
  {
    id: 10,
    title: "sitemap/sync",
    when: "20 2 * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "sitemap/sync",
    createdBy: "Admins",
  },
  {
    id: 9,
    title: "/email-queue/clear",
    when: "* * * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "/email-queue/clear",
    createdBy: "Admins",
  },
  {
    id: 8,
    title: "/email-queue/send",
    when: "* * * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "/email-queue/send",
    createdBy: "Admins",
  },
  {
    id: 7,
    title: "backup/timer",
    when: "20 2 * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "backup/timer",
    createdBy: "Admins",
  },
  {
    id: 6,
    title: "/contact/information/mark-spam",
    when: "* * * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "/contact/information/mark-spam",
    createdBy: "Admins",
  },
  {
    id: 5,
    title: "clear/debug",
    when: "0 * * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "clear/debug",
    createdBy: "Admins",
  },
  {
    id: 4,
    title: "clear/runtime",
    when: "20 2 * * *",
    type: "check 121",
    logs: 0,
    state: "Active",
    createdOn: "Feb 14, 2026, 11:02:04 AM",
    command: "clear/runtime",
    createdBy: "Admins",
  },
];

interface CronJobsTableProps {
  onCreateClick: () => void;
}

export function CronJobsTable({ onCreateClick }: CronJobsTableProps) {
  const [selectedCronJob, setSelectedCronJob] = useState<CronJob | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewClick = (cronJob: CronJob) => {
    setSelectedCronJob(cronJob);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (cronJob: CronJob) => {
    setSelectedCronJob(cronJob);
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (cronJob: CronJob) => {
    setSelectedCronJob(cronJob);
    setIsDetailDialogOpen(true);
  };

  const handleClone = (cronJob: CronJob) => {
    setSelectedCronJob(cronJob);
    setIsEditDialogOpen(true);
  };

  const handleExport = () => {
    toast.success("Exporting cron jobs...");
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      toast.success(`Importing file: ${e.target.files[0].name}`);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleClearCronJobs = () => {
    toast.success("All cron jobs cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createColumns(handleViewClick, handleEditClick);

  return (
    <>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <PageTitle title="Manage Cron Jobs" />
          <div className="flex gap-3 justify-end">
            <Button
              usage="create"
              onClick={onCreateClick}>
              Create New Cron Job
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              startIcon={<FileDown className="w-4 h-4" />}>
              Export
            </Button>
            <Button
              variant="outline"
              onClick={handleImport}
              startIcon={<FileUp className="w-4 h-4" />}>
              Import
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsClearDialogOpen(true)}
              startIcon={<Trash2 className="w-4 h-4" />}>
              Clear Cron Jobs
            </Button>
          </div>
        </div>

        {/* Hidden file input for import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Table */}
        <DataTable
          columns={columns}
          data={mockCronJobs}
          searchPlaceholder="Search by title, command, type..."
          searchableColumns={["id", "title", "when", "type", "state"]}
          onRowClick={handleRowClick}
        />
      </div>

      <CronJobDetailDialog
        cronJob={selectedCronJob}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onClone={handleClone}
      />

      <CronJobDialog
        cronJob={selectedCronJob}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedCronJob(null);
        }}
      />

      {/* Clear Cron Jobs Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              cron jobs from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearCronJobs}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

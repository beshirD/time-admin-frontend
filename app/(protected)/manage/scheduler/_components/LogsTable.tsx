"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createLogColumns } from "./logColumns";
import type { CronJobLog } from "@/types/entities";
import { LogDetailDialog } from "./LogDetailDialog";
import { LogDialog } from "./LogDialog";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
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
const mockLogs: CronJobLog[] = [
  {
    id: 2,
    state: "Pending",
    type: "Scheduled",
    cronjob: "10:sitemap/sync:20 2 * * *",
    scheduledOn: "Feb 14, 2026, 12:24:41 PM",
    executedOn: "",
    createdOn: "Feb 14, 2026, 12:21:55 PM",
    createdBy: "Admins",
  },
  {
    id: 1,
    state: "Pending",
    type: "OneTime",
    cronjob: "3:clear/history:20 2 * * *",
    scheduledOn: "Feb 14, 2026, 11:05:51 AM",
    executedOn: "",
    createdOn: "Feb 14, 2026, 11:05:51 AM",
    createdBy: "Admins",
  },
];

interface LogsTableProps {
  onCreateClick: () => void;
}

export function LogsTable({ onCreateClick }: LogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<CronJobLog | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleViewClick = (log: CronJobLog) => {
    setSelectedLog(log);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (log: CronJobLog) => {
    setSelectedLog(log);
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (log: CronJobLog) => {
    setSelectedLog(log);
    setIsDetailDialogOpen(true);
  };

  const handleClone = (log: CronJobLog) => {
    setSelectedLog(log);
    setIsEditDialogOpen(true);
  };

  const handleClearLogs = () => {
    toast.success("All logs cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createLogColumns(handleViewClick, handleEditClick);

  return (
    <>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <PageTitle title="Manage Logs" />
          <div className="flex gap-3 justify-end">
            <Button
              usage="create"
              onClick={onCreateClick}>
              Add Log
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsClearDialogOpen(true)}
              startIcon={<Trash2 className="w-4 h-4" />}>
              Clear Logs
            </Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={mockLogs}
          searchPlaceholder="Search by ID, state, type, cronjob..."
          searchableColumns={["id", "state", "type", "cronjob"]}
          onRowClick={handleRowClick}
        />
      </div>

      <LogDetailDialog
        log={selectedLog}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onClone={handleClone}
      />

      <LogDialog
        log={selectedLog}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedLog(null);
        }}
      />

      {/* Clear Logs Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              logs from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearLogs}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

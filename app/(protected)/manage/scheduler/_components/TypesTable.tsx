"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createTypeColumns } from "./typeColumns";
import type { CronJobType } from "@/types/entities";
import { TypeDialog } from "./TypeDialog";
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
const mockTypes: CronJobType[] = [
  {
    id: 1,
    name: "check 121",
    state: "Active",
    createdOn: "Feb 14, 2026, 10:58:18 AM",
  },
  {
    id: 2,
    name: "backup",
    state: "Active",
    createdOn: "Feb 14, 2026, 10:58:18 AM",
  },
  {
    id: 3,
    name: "email",
    state: "Active",
    createdOn: "Feb 14, 2026, 10:58:18 AM",
  },
  {
    id: 4,
    name: "cleanup",
    state: "Disabled",
    createdOn: "Feb 14, 2026, 10:58:18 AM",
  },
];

interface TypesTableProps {
  onCreateClick: () => void;
}

export function TypesTable({ onCreateClick }: TypesTableProps) {
  const [selectedType, setSelectedType] = useState<CronJobType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleEditClick = (type: CronJobType) => {
    setSelectedType(type);
    setIsEditDialogOpen(true);
  };

  const handleClearTypes = () => {
    toast.success("All cron job types cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createTypeColumns(handleEditClick);

  return (
    <>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <PageTitle title="Manage Cron Job Types" />
          <div className="flex gap-3 justify-end">
            <Button
              usage="create"
              onClick={onCreateClick}>
              Create New Type
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsClearDialogOpen(true)}
              startIcon={<Trash2 className="w-4 h-4" />}>
              Clear Types
            </Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={mockTypes}
          searchPlaceholder="Search by ID, title, state..."
          searchableColumns={["id", "name", "state"]}
        />
      </div>

      <TypeDialog
        type={selectedType}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedType(null);
        }}
      />

      {/* Clear Types Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              cron job types from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearTypes}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createStorageTypeColumns } from "./storageTypeColumns";
import type { StorageType } from "@/types/entities";
import { StorageTypeDetailDialog } from "./StorageTypeDetailDialog";
import { StorageTypeDialog } from "./StorageTypeDialog";
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

// Mock data
const mockTypes: StorageType[] = [
  {
    id: 1,
    title: "check 121",
    state: "Active",
    createdOn: "Feb 14, 2026, 8:14:23 PM",
    createdBy: "Admins",
  },
];

interface StorageTypesTableProps {
  onCreateClick: () => void;
}

export function StorageTypesTable({ onCreateClick }: StorageTypesTableProps) {
  const [selectedType, setSelectedType] = useState<StorageType | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleViewClick = (type: StorageType) => {
    setSelectedType(type);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (type: StorageType) => {
    setSelectedType(type);
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (type: StorageType) => {
    setSelectedType(type);
    setIsDetailDialogOpen(true);
  };

  const handleClearTypes = () => {
    toast.success("All storage types cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createStorageTypeColumns(handleViewClick, handleEditClick);

  return (
    <>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <PageTitle title="Manage Storage Types" />
          <div className="flex gap-3 justify-end">
            <Button
              usage="create"
              onClick={onCreateClick}>
              Create Type
            </Button>
            <Button
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
          searchPlaceholder="Search by ID, title..."
          searchableColumns={["id", "title"]}
          onRowClick={handleRowClick}
        />
      </div>

      <StorageTypeDetailDialog
        type={selectedType}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      <StorageTypeDialog
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
              storage types from the system.
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

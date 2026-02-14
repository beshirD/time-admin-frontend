"use client";

import { useState, useRef } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createProviderColumns } from "./providerColumns";
import type { StorageProvider } from "@/types/entities";
import { ProviderDetailDialog } from "./ProviderDetailDialog";
import { ProviderDialog } from "./ProviderDialog";
import Button from "@/components/ui/Button";
import { Trash2, FileUp, FileDown } from "lucide-react";
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
const mockProviders: StorageProvider[] = [
  {
    id: 1,
    title: "check 121",
    key: "231",
    secret: "123",
    endpoint: "https://rfc-sssh.com",
    state: "Active",
    type: "check 121",
    createdOn: "Feb 14, 2026, 8:15:35 PM",
    updatedOn: "Feb 14, 2026, 8:15:35 PM",
    createdBy: "Admins",
    description: "check 121 is done using next app",
    location: "nas",
  },
  {
    id: 2,
    title: "check 121",
    key: "231",
    secret: "123",
    endpoint: "https://rfc-sssh.com",
    state: "Active",
    type: "check 121",
    createdOn: "Feb 14, 2026, 8:15:35 PM",
    updatedOn: "Feb 14, 2026, 8:15:35 PM",
    createdBy: "Admins",
    description: "check 121 is done using next app",
    location: "nas",
  },
  {
    id: 3,
    title: "check 121",
    key: "231",
    secret: "123",
    endpoint: "https://rfc-sssh.com",
    state: "Active",
    type: "check 121",
    createdOn: "Feb 14, 2026, 8:15:35 PM",
    updatedOn: "Feb 14, 2026, 8:15:35 PM",
    createdBy: "Admins",
    description: "check 121 is done using next app",
    location: "nas",
  },
  {
    id: 4,
    title: "check 121",
    key: "231",
    secret: "123",
    endpoint: "https://rfc-sssh.com",
    state: "Active",
    type: "check 121",
    createdOn: "Feb 14, 2026, 8:15:35 PM",
    updatedOn: "Feb 14, 2026, 8:15:35 PM",
    createdBy: "Admins",
    description: "check 121 is done using next app",
    location: "nas",
  },
  {
    id: 5,
    title: "check 121",
    key: "231",
    secret: "123",
    endpoint: "https://rfc-sssh.com",
    state: "Active",
    type: "check 121",
    createdOn: "Feb 14, 2026, 8:15:35 PM",
    updatedOn: "Feb 14, 2026, 8:15:35 PM",
    createdBy: "Admins",
    description: "check 121 is done using next app",
    location: "nas",
  },
];

interface ProvidersTableProps {
  onCreateClick: () => void;
}

export function ProvidersTable({ onCreateClick }: ProvidersTableProps) {
  const [selectedProvider, setSelectedProvider] =
    useState<StorageProvider | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewClick = (provider: StorageProvider) => {
    setSelectedProvider(provider);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (provider: StorageProvider) => {
    setSelectedProvider(provider);
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (provider: StorageProvider) => {
    setSelectedProvider(provider);
    setIsDetailDialogOpen(true);
  };

  const handleClone = (provider: StorageProvider) => {
    setSelectedProvider(provider);
    setIsEditDialogOpen(true);
  };

  const handleClearProviders = () => {
    toast.success("All storage providers cleared successfully");
    setIsClearDialogOpen(false);
  };

  const handleExport = () => {
    toast.success("Providers exported successfully");
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`Importing ${file.name}...`);
      // Reset input
      event.target.value = "";
    }
  };

  const columns = createProviderColumns(handleViewClick, handleEditClick);

  return (
    <>
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <PageTitle title="Manage Storage Providers" />
          <div className="flex gap-3 justify-end">
            <Button
              usage="create"
              onClick={onCreateClick}>
              Create Provider
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
              Clear Providers
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
          data={mockProviders}
          searchPlaceholder="Search by title, key, endpoint, type..."
          searchableColumns={["id", "title", "key", "endpoint", "type"]}
          onRowClick={handleRowClick}
        />
      </div>

      <ProviderDetailDialog
        provider={selectedProvider}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onClone={handleClone}
      />

      <ProviderDialog
        provider={selectedProvider}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedProvider(null);
        }}
      />

      {/* Clear Providers Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              storage providers from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearProviders}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

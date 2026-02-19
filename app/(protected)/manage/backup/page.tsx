"use client";

import PageTitle from "@/components/common/PageTitle";
import { BackupsTable } from "./_components/BackupsTable";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

export default function BackupPage() {
  const handleGenerateBackup = () => {
    toast.success("Generating database backup...");
  };

  const handleCreateStructure = () => {
    toast.success("Creating database structure...");
  };

  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4 justify-between items-center">
        <PageTitle title="Manage Database Backup Files" />
        <div className="flex gap-3">
          <Button
            usage="create"
            onClick={handleGenerateBackup}>
            Generate Backup
          </Button>
          <Button
            usage="create"
            onClick={handleCreateStructure}>
            Create Structure
          </Button>
        </div>
      </div>
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
        <BackupsTable />
      </div>
    </div>
  );
}

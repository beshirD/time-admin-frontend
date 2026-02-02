"use client";

import Button from "@/components/ui/Button";
import { Download, Plus } from "lucide-react";

interface AdvancesHeaderProps {
  onCreateClick: () => void;
  onExportClick: () => void;
}

export default function AdvancesHeader({
  onCreateClick,
  onExportClick,
}: AdvancesHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 px-4 py-2 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Driver Advances
      </h1>
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="ring-primary bg-primary/10 hover:bg-primary/25 text-primary border-2 border-primary px-3 py-1.5"
          onClick={onExportClick}>
          <Download className="h-4 w-4 mr-1" />
          Export Data
        </Button>
        <Button
          size="sm"
          className="px-3 py-2"
          onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-1" />
          Create Advance
        </Button>
      </div>
    </div>
  );
}

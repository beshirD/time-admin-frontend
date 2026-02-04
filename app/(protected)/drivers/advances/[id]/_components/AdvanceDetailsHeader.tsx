"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import SettlementModal from "../../_components/SettlementModal";
import { DriverAdvance } from "@/types/entities";
import { useState } from "react";
import { toast } from "sonner";

interface AdvanceDetailsHeaderProps {
  advanceData: DriverAdvance & {
    created?: string;
    balance?: number;
    netCashPosition?: number;
  };
  onDelete: () => void;
}

export default function AdvanceDetailsHeader({
  advanceData,
  onDelete,
}: AdvanceDetailsHeaderProps) {
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);

  const handleSubmitSettlement = () => {
    toast.success("Settlement completed successfully!", {
      description: `Settled advance for ${advanceData.driverName}`,
    });
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-2 rounded-lg border">
      <div className="flex items-center gap-4">
        <Link
          href="/drivers/advances"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-lg font-medium">Back to Advances</span>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {advanceData.status === "Active" && (
          <button
            onClick={() => setIsSettlementModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/20 border-2 border-primary rounded-lg transition">
            <FileText className="h-4 w-4" />
            Create Settlement
          </button>
        )}
        <Button
          usage="delete"
          onClick={onDelete}>
          Delete
        </Button>
      </div>

      {/* Settlement Modal */}
      <SettlementModal
        isOpen={isSettlementModalOpen}
        onClose={() => setIsSettlementModalOpen(false)}
        advance={advanceData}
        onSubmit={handleSubmitSettlement}
      />
    </div>
  );
}

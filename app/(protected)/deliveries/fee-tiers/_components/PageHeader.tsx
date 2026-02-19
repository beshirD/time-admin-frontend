"use client";

import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";
import { DeliveryFeeTier, ErrorLog } from "@/types/entities";
import { Settings, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
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
import { TierDialog } from "./TierDialog";
import { DeliveryFeeSettingsDialog } from "./DeliveryFeeSettingsDialog";

export default function PageHeader() {
  const [selectedTier, setSelectedTier] = useState<DeliveryFeeTier | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center bg-white dark:bg-gray-900 px-6 py-4 rounded-lg border justify-between">
        {/* Header with Action Buttons */}
        <PageTitle title="Delivery Fee Tiers" />
        <div className="flex gap-3">
          <Button
            usage="create"
            onClick={() => setIsCreateDialogOpen(true)}>
            Create New Tier
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSettingsDialogOpen(true)}
            startIcon={<Settings className="w-4 h-4" />}>
            Fee Settings
          </Button>
        </div>
      </div>
      {/* Create Dialog */}
      <TierDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {/* Settings Dialog */}
      <DeliveryFeeSettingsDialog
        isOpen={isSettingsDialogOpen}
        onClose={() => setIsSettingsDialogOpen(false)}
      />

      {/* Clear Logs Confirmation Dialog */}
      <AlertDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              error logs from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

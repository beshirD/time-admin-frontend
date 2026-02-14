"use client";

import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";
import { ErrorLog } from "@/types/entities";
import { Trash2 } from "lucide-react";
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

export default function PageHeader() {
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleClearLogs = () => {
    toast.success("All Login Histories cleared successfully");
    setIsClearDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center bg-white dark:bg-gray-900 px-6 py-4 rounded-lg border justify-between">
        <PageTitle title="Login Histories" />
        <Button
          variant="destructive"
          onClick={() => setIsClearDialogOpen(true)}
          startIcon={<Trash2 className="w-4 h-4" />}>
          Clear History
        </Button>
      </div>
      {/* Clear Logs Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              Login Histories from the system.
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

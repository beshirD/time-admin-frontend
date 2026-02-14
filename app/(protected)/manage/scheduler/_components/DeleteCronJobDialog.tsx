"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteCronJobDialogProps {
  cronJobId: number | string;
  cronJobTitle: string;
  children: React.ReactNode;
  onDeleteSuccess?: () => void;
}

export function DeleteCronJobDialog({
  cronJobId,
  cronJobTitle,
  children,
  onDeleteSuccess,
}: DeleteCronJobDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    // For now, just show success toast
    toast.success("Cron job deleted successfully");
    setIsOpen(false);
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the cron
            job <strong>{cronJobTitle}</strong> and remove its data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

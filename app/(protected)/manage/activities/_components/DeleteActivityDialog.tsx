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

interface DeleteActivityDialogProps {
  activityId: number | string;
  activityContent: string;
  children: React.ReactNode;
  onDeleteSuccess?: () => void;
}

export function DeleteActivityDialog({
  activityId,
  activityContent,
  children,
  onDeleteSuccess,
}: DeleteActivityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    // For now, just show success toast
    toast.success("Activity deleted successfully");
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
            This action cannot be undone. This will permanently delete the
            activity <strong>#{activityId}</strong> and remove its data from our
            servers.
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {activityContent.substring(0, 100)}
              {activityContent.length > 100 ? "..." : ""}
            </div>
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

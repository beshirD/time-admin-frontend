"use client";

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
import { useState } from "react";

interface DeleteConfirmationDialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  itemName?: string;
  itemType?: string;
  onConfirm?: () => Promise<void> | void;
  onSuccess?: () => void;
}

export function DeleteConfirmationDialog({
  trigger,
  title = "Are you absolutely sure?",
  description,
  itemName,
  itemType = "Item",
  onConfirm,
  onSuccess,
}: DeleteConfirmationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default action if inside a form or link
    setIsDeleting(true);

    try {
      if (onConfirm) {
        await onConfirm();
      }

      // Default toast if one isn't handled in onConfirm
      toast.success(`${itemType} deleted successfully`, {
        description: itemName
          ? `${itemName} has been removed from the system.`
          : undefined,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || (
              <>
                This action cannot be undone. This will permanently delete{" "}
                {itemName && <strong>{itemName}</strong>} and remove the data
                from our servers.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

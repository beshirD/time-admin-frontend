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

interface DeleteStorageTypeDialogProps {
  typeId: number | string;
  typeTitle: string;
  children: React.ReactNode;
  onDeleteSuccess?: () => void;
}

export function DeleteStorageTypeDialog({
  typeTitle,
  children,
  onDeleteSuccess,
}: DeleteStorageTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    toast.success("Storage type deleted successfully");
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
            storage type <strong>{typeTitle}</strong> and remove its data from
            our servers.
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

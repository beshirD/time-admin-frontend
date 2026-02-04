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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AssignedDriver } from "@/types/entities";

interface CancelAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  driver: AssignedDriver | null;
  onConfirm: () => void;
}

export function CancelAssignmentDialog({
  isOpen,
  onClose,
  driver,
  onConfirm,
}: CancelAssignmentDialogProps) {
  const handleConfirm = () => {
    if (driver) {
      toast.success(`Assignment cancelled for ${driver.fullName}`, {
        description: `${driver.fullName} has been removed from ${driver.assignedTo}`,
      });
      onConfirm();
      onClose();
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Driver Assignment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel the assignment for{" "}
            <strong>{driver?.fullName}</strong>? This will remove them from{" "}
            <strong>{driver?.assignedTo}</strong> and move them to the
            unassigned drivers list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, Keep Assignment</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleConfirm}>
            Yes, Cancel Assignment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

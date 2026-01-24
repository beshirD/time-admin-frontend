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
import { useRouter } from "next/navigation";

interface DeleteTailorAdminDialogProps {
  tailorAdminId: number | string;
  tailorAdminName: string;
  children: React.ReactNode;
  onDeleteSuccess?: () => void;
}

export function DeleteTailorAdminDialog({
  tailorAdminId,
  tailorAdminName,
  children,
  onDeleteSuccess,
}: DeleteTailorAdminDialogProps) {
  const router = useRouter();

  const handleDelete = async () => {
    toast.success("Tailor Admin deleted successfully", {
      description: `${tailorAdminName} has been removed from the system.`,
    });

    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            tailor admin <strong>{tailorAdminName}</strong> and remove their
            data from our servers.
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

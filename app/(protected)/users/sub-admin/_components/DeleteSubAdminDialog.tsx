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
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteSubAdminDialogProps {
  subAdminId: number | string;
  subAdminName: string;
  children: React.ReactNode;
}

export function DeleteSubAdminDialog({
  subAdminId,
  subAdminName,
  children,
}: DeleteSubAdminDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useDeleteUser();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(parseInt(subAdminId.toString()));
      setIsOpen(false);
      // Navigate to sub-admin list after successful deletion
      router.push("/users/sub-admin");
    } catch {
      // Error handled by mutation
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
            sub-admin <strong>{subAdminName}</strong> and remove their data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

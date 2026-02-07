"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, UserX } from "lucide-react";
import Button from "@/components/ui/Button";
import { DeleteSubAdminDialog } from "./DeleteSubAdminDialog";
import { BanUserDialog } from "@/components/shared/BanUserDialog";
import { DeactivateUserDialog } from "@/components/shared/DeactivateUserDialog";

interface SubAdminHeaderProps {
  subAdminId: number | string;
  fullName: string;
  status: string;
  role?: string;
}

export function SubAdminHeader({
  subAdminId,
  fullName,
  status,
  role = "Sub-Admin",
}: SubAdminHeaderProps) {
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);

  const statusStyles = {
    ACTIVE:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    INACTIVE:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  return (
    <>
      <div className="py-3 px-5 flex bg-white dark:bg-gray-900 rounded-lg border flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/users/sub-admin"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {fullName}
            </h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                statusStyles[status as keyof typeof statusStyles] ||
                statusStyles.INACTIVE
              }`}>
              {status}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
              {role}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsBanDialogOpen(true)}
            className="border-error-500 text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20">
            <Ban className="h-4 w-4 mr-2" />
            Ban
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDeactivateDialogOpen(true)}
            className="border-warning-500 text-warning-500 hover:bg-warning-50 dark:hover:bg-warning-900/20">
            <UserX className="h-4 w-4 mr-2" />
            Deactivate
          </Button>
          <DeleteSubAdminDialog
            subAdminId={subAdminId}
            subAdminName={fullName}
            onDeleteSuccess={() => {
              window.location.href = "/users/sub-admin";
            }}>
            <Button usage="delete">Delete</Button>
          </DeleteSubAdminDialog>
        </div>
      </div>

      {/* Ban Dialog */}
      <BanUserDialog
        isOpen={isBanDialogOpen}
        onClose={() => setIsBanDialogOpen(false)}
        userName={fullName}
      />

      {/* Deactivate Dialog */}
      <DeactivateUserDialog
        isOpen={isDeactivateDialogOpen}
        onClose={() => setIsDeactivateDialogOpen(false)}
        userName={fullName}
      />
    </>
  );
}

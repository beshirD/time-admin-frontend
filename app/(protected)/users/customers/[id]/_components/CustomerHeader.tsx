"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, UserX } from "lucide-react";
import Button from "@/components/ui/Button";
import { DeleteCustomerDialog } from "../../_components/DeleteCustomerDialog";
import { BanUserDialog } from "@/components/shared/BanUserDialog";
import { DeactivateUserDialog } from "@/components/shared/DeactivateUserDialog";

interface CustomerHeaderProps {
  customerId: string;
  fullName: string;
  status: string;
  role: string;
}

export function CustomerHeader({
  customerId,
  fullName,
  status,
  role,
}: CustomerHeaderProps) {
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);

  return (
    <>
      <div className="py-3 bg-white dark:bg-gray-900 rounded-lg border flex items-center px-5 justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/users/customers"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {fullName}
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400">
              {status}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
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
          <DeleteCustomerDialog
            customerId={customerId}
            customerName={fullName}>
            <Button usage="delete">Delete</Button>
          </DeleteCustomerDialog>
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

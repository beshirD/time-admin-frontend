"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { DeleteCustomerDialog } from "../../_components/DeleteCustomerDialog";
import {
  ChangeUserStatusDialog,
  type StatusChangeDetails,
} from "@/components/shared/ChangeUserStatusDialog";
import {
  useBanUser,
  useUnbanUser,
  useActivateUser,
  useDeactivateUser,
} from "@/hooks/useUserStatus";
import type { UserStatus } from "@/types/user";

interface CustomerHeaderProps {
  customerId: string;
  fullName: string;
  status: UserStatus;
  role: string;
}

export function CustomerHeader({
  customerId,
  fullName,
  status,
  role,
}: CustomerHeaderProps) {
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();
  const activateMutation = useActivateUser();
  const deactivateMutation = useDeactivateUser();

  const handleStatusChange = async (details: StatusChangeDetails) => {
    const userId = parseInt(customerId);
    const requestBody = {
      reason: details.reason,
      notifyUser: details.notifyUser,
      ...(details.durationDays && { durationDays: details.durationDays }),
      ...(details.banUntil && { banUntil: details.banUntil }),
      ...(details.notificationMessage && {
        notificationMessage: details.notificationMessage,
      }),
    };

    console.log("Status change request:", {
      userId,
      newStatus: details.newStatus,
      requestBody,
    });

    try {
      // Select the appropriate mutation based on the new status
      switch (details.newStatus) {
        case "BANNED":
          await banMutation.mutateAsync({ userId, details: requestBody });
          break;
        case "ACTIVE":
          // If current status is BANNED, unban. Otherwise, activate.
          if (status === "BANNED") {
            await unbanMutation.mutateAsync({ userId, details: requestBody });
          } else {
            await activateMutation.mutateAsync({
              userId,
              details: requestBody,
            });
          }
          break;
        case "INACTIVE":
          await deactivateMutation.mutateAsync({
            userId,
            details: requestBody,
          });
          break;
      }
      setIsStatusDialogOpen(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const getStatusBadgeColor = (userStatus: UserStatus) => {
    switch (userStatus) {
      case "ACTIVE":
        return "bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400";
      case "INACTIVE":
        return "bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400";
      case "BANNED":
        return "bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400";
      case "PENDING":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const isLoading =
    banMutation.isPending ||
    unbanMutation.isPending ||
    activateMutation.isPending ||
    deactivateMutation.isPending;

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
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusBadgeColor(status)}`}>
              {status}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
              {role}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Single Change Status Button */}
          {/* {status !== "PENDING" && ( */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsStatusDialogOpen(true)}
            disabled={isLoading}
            className="border-primary text-primary hover:bg-primary/10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Change User Status
          </Button>
          {/* )} */}

          <DeleteCustomerDialog
            customerId={customerId}
            customerName={fullName}>
            <Button usage="delete">Delete</Button>
          </DeleteCustomerDialog>
        </div>
      </div>

      {/* Status Change Dialog */}
      <ChangeUserStatusDialog
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onConfirm={handleStatusChange}
        userName={fullName}
        currentStatus={status}
        isLoading={isLoading}
      />
    </>
  );
}

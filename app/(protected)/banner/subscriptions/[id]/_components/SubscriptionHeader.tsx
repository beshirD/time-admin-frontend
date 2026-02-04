"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { CreateSubscriptionDialog } from "../../_components/CreateSubscriptionDialog";

interface SubscriptionHeaderProps {
  subscriptionId: string;
  restaurantName: string;
  status: string;
}

export function SubscriptionHeader({
  subscriptionId,
  restaurantName,
  status,
}: SubscriptionHeaderProps) {
  const isActive = status.toLowerCase().includes("active");
  const isExpired = status.toLowerCase().includes("expired");

  let statusStyles =
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";

  if (isActive) {
    statusStyles =
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  } else if (isExpired) {
    statusStyles =
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  }

  return (
    <div className="py-3 flex items-center px-5 justify-between bg-white dark:bg-gray-900 rounded-lg border">
      <div className="flex items-center gap-4">
        <Link
          href="/banner/subscriptions"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {restaurantName}
          </h1>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusStyles}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CreateSubscriptionDialog
          title="Extend Subscription"
          isExtend={true}
          resturant={restaurantName}
        />
        <DeleteConfirmationDialog
          itemType="subscription"
          itemName={restaurantName}
          onSuccess={() => {
            window.location.href = "/banner/subscriptions";
          }}
          trigger={<Button usage="delete">Delete</Button>}
        />
      </div>
    </div>
  );
}

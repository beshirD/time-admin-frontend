"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BannerDetailsHeaderProps {
  bannerId: string;
  bannerName: string;
  status: "active" | "pending" | "archive";
}

const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
  },
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-500",
  },
  archive: {
    label: "Archived",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
};

import { DeleteBannerDialog } from "./DeleteBannerDialog";

export default function BannerDetailsHeader({
  bannerId,
  bannerName,
  status,
}: BannerDetailsHeaderProps) {
  const router = useRouter();
  const statusInfo = statusConfig[status];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bannerName}
              </h1>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-semibold",
                  statusInfo.className,
                )}>
                {statusInfo.label}
              </span>
            </div>
            {/* <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Banner ID: {bannerId}
            </p> */}
          </div>
        </div>

        <DeleteBannerDialog
          bannerId={bannerId}
          bannerName={bannerName}
          onDeleteSuccess={() => router.push("/banner")}>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete Banner
          </button>
        </DeleteBannerDialog>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { DeleteBannerPackageDialog } from "./DeleteBannerPackageDialog";

interface BannerPackageHeaderProps {
  packageId: string;
  packageTitle: string;
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
  },
  Inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
};

export default function BannerPackageHeader({
  packageId,
  packageTitle,
  status,
}: BannerPackageHeaderProps) {
  const router = useRouter();
  const statusInfo = statusConfig[status] || statusConfig.Inactive;

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
                {packageTitle}
              </h1>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-semibold",
                  statusInfo.className,
                )}>
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>

        <DeleteBannerPackageDialog
          packageId={packageId}
          packageTitle={packageTitle}
          onDeleteSuccess={() => router.push("/banner/packages")}>
          <Button usage="delete">Delete Package</Button>
        </DeleteBannerPackageDialog>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Trash2, Info, FileText, Package } from "lucide-react";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { useSearchParams } from "next/navigation";

interface DriverHeaderProps {
  driverId: string;
  driverName: string;
  status: string;
  isApprove?: string;
}

export function DriverHeader({
  driverId,
  driverName,
  status,
  isApprove,
}: DriverHeaderProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "details";

  // Status badge styling
  const getStatusStyle = () => {
    if (status === "Online") {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const tabs = [
    { id: "details", label: "Details", icon: Info },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "requested-orders", label: "Requested Orders", icon: Package },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border px-2 py-1 space-y-4 rounded-lg">
      <div className="py-3 flex items-center px-5 justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/drivers"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {driverName}
            </h1>
            <span
              className={`inline-flex border items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusStyle()}`}>
              {status}
            </span>
          </div>
          {/* Approval Status Message */}
          {isApprove === "Approve" && (
            <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 border border-green-400 dark:border-green-800 rounded-lg">
              <p className="text-base text-green-800 dark:text-green-400 font-medium">
                This driver is already approved.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs Navigation */}
          <nav className="flex gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.id}
                  href={`/drivers/${driverId}?tab=${tab.id}`}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "text-gray-600 dark:text-gray-400 border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                  }`}>
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <DeleteConfirmationDialog
            itemType="driver"
            itemName={driverName}
            onSuccess={() => {
              window.location.href = "/drivers";
            }}
            trigger={
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors border border-red-600 dark:border-red-500">
                <Trash2 className="h-4 w-4" />
                Delete Driver
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { DeleteSubAdminDialog } from "./DeleteSubAdminDialog";

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
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <div className="py-3 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              statusStyles.Inactive
            }`}>
            {status}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            {role}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DeleteSubAdminDialog
          subAdminId={subAdminId}
          subAdminName={fullName}
          onDeleteSuccess={() => {
            window.location.href = "/users/sub-admin";
          }}>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-blue-500/20 rounded-lg transition-colors duration-200">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          {/* <IconButton
            variant="delete"
            title="Delete Sub-Admin">
            <Trash2 className="h-4 w-4" />
          </IconButton> */}
        </DeleteSubAdminDialog>
      </div>
    </div>
  );
}

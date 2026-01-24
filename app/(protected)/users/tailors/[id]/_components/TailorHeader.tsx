"use client";

import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { DeleteTailorDialog } from "../../_components/DeleteTailorDialog";

interface TailorHeaderProps {
  tailorId: number | string;
  fullName: string;
  status: string;
  role?: string;
}

export function TailorHeader({
  tailorId,
  fullName,
  status,
  role = "Tailor",
}: TailorHeaderProps) {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link
          href="/users/tailors"
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
        <Link href={`/users/tailors/${tailorId}/edit`}>
          <IconButton
            variant="edit"
            title="Edit Tailor">
            <Pencil className="h-4 w-4" />
          </IconButton>
        </Link>

        <DeleteTailorDialog
          tailorId={tailorId}
          tailorName={fullName}
          onDeleteSuccess={() => {
            window.location.href = "/users/tailors";
          }}>
          <IconButton
            variant="delete"
            title="Delete Tailor">
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </DeleteTailorDialog>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface QueueHeaderProps {
  queueId: string;
  restaurantName: string;
}

export function QueueHeader({ queueId, restaurantName }: QueueHeaderProps) {
  return (
    <div className="py-3 flex items-center px-5 justify-between bg-white dark:bg-gray-900 rounded-lg border">
      <div className="flex items-center gap-4">
        <Link
          href="/banner/approval-queue"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {restaurantName} - Subscription Request
          </h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending Approval
          </span>
        </div>
      </div>
    </div>
  );
}

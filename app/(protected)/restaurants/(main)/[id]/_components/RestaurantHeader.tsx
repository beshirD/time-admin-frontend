"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RestaurantHeaderProps {
  restaurantId: string;
  restaurantName: string;
  status: string;
}

export function RestaurantHeader({
  restaurantId,
  restaurantName,
  status,
}: RestaurantHeaderProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg px-5 py-3 border gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/restaurants"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {restaurantName}
          </h1>
        </div>
      </div>
      <div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}>
          {status}
        </span>
      </div>
    </div>
  );
}

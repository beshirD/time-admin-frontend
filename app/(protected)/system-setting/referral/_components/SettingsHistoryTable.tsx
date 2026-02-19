"use client";

import { History, CheckCircle2, Loader2 } from "lucide-react";
import { useReferralSettingsHistory } from "@/hooks/useReferralSettings";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SettingsHistoryTable() {
  const { data: history, isLoading, error } = useReferralSettingsHistory();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <History className="h-5 w-5 text-gray-400" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Settings History
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Audit log of all previous configurations.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="py-8 text-center text-sm text-red-400 dark:text-red-500">
          {(error as Error).message || "Failed to load history"}
        </div>
      ) : !history || history.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
          No history available yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 dark:bg-gray-800/50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  #
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Points / Referral
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Pts / Discount %
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Max Discount
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Min Order
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {history.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                    {row.pointsPerReferredOrder.toLocaleString()} pts
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {row.pointsPerDiscountPercentage.toLocaleString()} pts
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {row.maxDiscountPercentage}%
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    ${row.minOrderAmountForPoints.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {row.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(row.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

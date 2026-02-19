"use client";

import { Gift } from "lucide-react";
import { PointsSettingsForm } from "./PointsSettingsForm";
import { SettingsHistoryTable } from "./SettingsHistoryTable";

export function ReferralContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-lg border px-6 py-4">
        <div className="p-2.5 bg-primary/10 rounded-lg">
          <Gift className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Referral &amp; Points Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Configure how users earn and redeem loyalty points across the
            platform. Changes apply globally.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <PointsSettingsForm />

      {/* History Table */}
      <SettingsHistoryTable />
    </div>
  );
}

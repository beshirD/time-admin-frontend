"use client";

import { useSearchParams } from "next/navigation";
import { SettingsTabs } from "./SettingsTabs";
import { ProfileTab } from "./ProfileTab";
import { PreferencesTab } from "./PreferencesTab";
import { RolesPermissionsTab } from "./RolesPermissionsTab";

export function SettingsContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  return (
    <div className="w-full space-y-5 mb-7">
      {/* Tabs Navigation */}
      <SettingsTabs activeTab={activeTab} />

      {/* Tab Content */}
      <div className="">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "preferences" && <PreferencesTab />}
        {activeTab === "roles-permissions" && <RolesPermissionsTab />}
        {activeTab === "security" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Security tab - Coming soon
          </div>
        )}
        {activeTab === "notifications" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Notifications tab - Coming soon
          </div>
        )}
        {activeTab === "privacy" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Privacy tab - Coming soon
          </div>
        )}
        {activeTab === "billing" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Billing tab - Coming soon
          </div>
        )}
        {activeTab === "integrations" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Integrations tab - Coming soon
          </div>
        )}
        {activeTab === "advanced" && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Advanced tab - Coming soon
          </div>
        )}
      </div>
    </div>
  );
}

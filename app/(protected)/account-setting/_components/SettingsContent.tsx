"use client";

import { useSearchParams } from "next/navigation";
import { SettingsTabs } from "./SettingsTabs";
import { ProfileTab } from "./ProfileTab";
import { PreferencesTab } from "./PreferencesTab";
import { NotificationsTab } from "./NotificationsTab";

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
        {activeTab === "notifications" && <NotificationsTab />}
      </div>
    </div>
  );
}

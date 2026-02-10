"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Plug,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import PageTitle from "@/components/common/PageTitle";

interface SettingsTabsProps {
  activeTab: string;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: Settings },
  { id: "roles-permissions", label: "Roles & Permissions", icon: ShieldCheck },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "advanced", label: "Advanced", icon: Sliders },
];

export function SettingsTabs({ activeTab }: SettingsTabsProps) {
  const router = useRouter();

  const handleTabClick = (tabId: string) => {
    router.push(`/settings?tab=${tabId}`);
  };

  return (
    <div className="bg-white flex justify-between items-center dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-2">
      <PageTitle title="System Settings" />
      <div className="flex items-center gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}>
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

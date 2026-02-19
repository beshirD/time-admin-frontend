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
import type { Notification } from "@/types/entities";

// Mock data - replace with actual API call or hook
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #12345 has been placed",
    type: "order",
    status: "unread",
    createdAt: "2026-02-16T08:30:00Z",
  },
  {
    id: 2,
    title: "System Maintenance",
    message: "Scheduled maintenance",
    type: "system",
    status: "unread",
    createdAt: "2026-02-15T14:20:00Z",
  },
  {
    id: 4,
    title: "Payment Failed",
    message: "Payment renewal failed",
    type: "alert",
    status: "unread",
    createdAt: "2026-02-13T16:45:00Z",
  },
];

interface SettingsTabsProps {
  activeTab: string;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: Settings },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export function SettingsTabs({ activeTab }: SettingsTabsProps) {
  const router = useRouter();

  // Calculate unread notifications count
  const unreadCount = mockNotifications.filter(
    (n) => n.status === "unread",
  ).length;

  const handleTabClick = (tabId: string) => {
    router.push(`/account-setting?tab=${tabId}`);
  };

  return (
    <div className="bg-white flex justify-between items-center dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 px-6 py-2">
      <PageTitle title="Account Settings" />
      <div className="flex items-center gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors whitespace-nowrap relative",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}>
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === "notifications" && unreadCount > 0 && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-xs font-semibold rounded-full min-w-[20px] text-center",
                    isActive
                      ? "bg-white text-primary"
                      : "bg-primary text-white",
                  )}>
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

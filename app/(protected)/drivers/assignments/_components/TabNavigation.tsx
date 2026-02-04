"use client";

import Link from "next/link";
import { Users, UserCog, LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabNavigationProps {
  activeTab: string;
}

const tabs: Tab[] = [
  { id: "assignments", label: "Assignments", icon: UserCog },
  { id: "all-drivers", label: "All Drivers", icon: Users },
];

export default function TabNavigation({ activeTab }: TabNavigationProps) {
  return (
    <nav className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.id}
            href={`/drivers/assignments?tab=${tab.id}`}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md border-2 flex items-center gap-2 ${
              isActive
                ? "bg-primary text-white border-primary"
                : "text-gray-600 dark:text-gray-400 border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
            }`}>
            <Icon className="h-4 w-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

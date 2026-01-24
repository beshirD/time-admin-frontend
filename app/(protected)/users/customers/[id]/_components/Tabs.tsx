"use client";

interface TabsProps {
  activeTab: "access-token" | "additional-address" | "orders";
  onTabChange: (tab: "access-token" | "additional-address" | "orders") => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: "access-token" as const, label: "Access Token" },
    { id: "additional-address" as const, label: "Additional Address" },
    { id: "orders" as const, label: "Orders" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

interface TabsProps {
  activeTab: "food-items" | "availability" | "ratings";
  onTabChange: (tab: "food-items" | "availability" | "ratings") => void;
}

export function RestaurantTabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: "food-items" as const, label: "Food Items" },
    { id: "availability" as const, label: "Availability" },
    { id: "ratings" as const, label: "Ratings & Reviews" },
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "border-b-2 border-brand-600 text-brand-600 dark:text-brand-400"
              : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

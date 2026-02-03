"use client";

import { useState } from "react";
import { RestaurantTabs } from "./RestaurantTabs";
import { FoodItemsTable } from "./FoodItemsTable";
import { AvailabilitySection } from "./AvailabilitySection";
import { RatingsTable } from "./RatingsTable";

export function RestaurantDetailsSection() {
  const [activeTab, setActiveTab] = useState<
    "food-items" | "availability" | "ratings"
  >("food-items");

  return (
    <div className="mt-6 bg-white border dark:bg-gray-900 rounded-xl">
      <div className="bg-brand-600 text-white px-4 py-2 rounded-lg">
        <h2 className="text-lg font-semibold">Restaurant Details</h2>
      </div>

      {/* Tabs */}
      <RestaurantTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="overflow-hidden">
        {activeTab === "food-items" && <FoodItemsTable />}
        {activeTab === "availability" && <AvailabilitySection />}
        {activeTab === "ratings" && <RatingsTable />}
      </div>
    </div>
  );
}

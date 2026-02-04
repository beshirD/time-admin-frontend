"use client";

import { useState } from "react";
import { AddOnCategory, FoodCategory } from "@/types/entities";
import { AddOnsCategoryContent } from "./AddOnsCategoryContent";
import { FoodCategoryContent } from "./FoodCategoryContent";
import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";

interface CategoriesTabsProps {
  addOnCategoriesData: AddOnCategory[];
  foodCategoriesData: FoodCategory[];
}

export function CategoriesTabs({
  addOnCategoriesData,
  foodCategoriesData,
}: CategoriesTabsProps) {
  const [activeTab, setActiveTab] = useState<"addons" | "food">("addons");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="w-full space-y-5 mb-7">
      {/* Header with Title, Create Button, and Tabs */}
      <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
        <PageTitle
          title={
            activeTab === "addons"
              ? "Add-Ons Categories Management"
              : "Food Categories Management"
          }
        />
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsCreateOpen(true)}
            usage="create">
            {activeTab === "addons"
              ? "Create Add-On Category"
              : "Create Food Category"}
          </Button>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("addons")}
              className={`px-4 py-2 text-sm border border-primary font-medium rounded-md transition-colors ${
                activeTab === "addons"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}>
              Add-Ons Category
            </button>
            <button
              onClick={() => setActiveTab("food")}
              className={`px-4 py-2 text-sm border border-primary font-medium rounded-md transition-colors ${
                activeTab === "food"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}>
              Food Category
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "addons" ? (
        <AddOnsCategoryContent
          initialData={addOnCategoriesData}
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
        />
      ) : (
        <FoodCategoryContent
          initialData={foodCategoriesData}
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
        />
      )}
    </div>
  );
}

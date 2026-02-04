"use client";

import { useState } from "react";
import { AddOnCategory, FoodCategory } from "@/types/entities";
import { AddOnsCategoryContent } from "./_components/AddOnsCategoryContent";
import { FoodCategoryContent } from "./_components/FoodCategoryContent";
import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

// Mock data for add-on categories
const addOnCategoriesData: AddOnCategory[] = [
  {
    id: 3,
    title: "check",
    createdOn: "Feb 3, 2026, 12:49:13 PM",
    createdBy: "Admins",
  },
  {
    id: 2,
    title: "Drink",
    createdOn: "Jan 6, 2026, 8:40:18 PM",
    createdBy: "Admins",
  },
  {
    id: 1,
    title: "Fresh (fast serve)",
    createdOn: "May 10, 2025, 9:14:59 AM",
    createdBy: "Admins",
  },
];

// Mock data for food categories
const foodCategoriesData: FoodCategory[] = [
  {
    id: 22,
    title: "test added",
    state: "Active",
    type: "Restaurant",
  },
  {
    id: 21,
    title: "rice",
    state: "Active",
    type: "Restaurant",
  },
  {
    id: 20,
    title: "soda",
    state: "Active",
    type: "Store",
  },
  {
    id: 19,
    title: "Pizza",
    state: "Active",
    type: "Restaurant",
  },
  {
    id: 18,
    title: "Hot Drinks",
    state: "Deleted",
    type: "Store",
  },
  {
    id: 17,
    title: "Coffee",
    state: "Deleted",
    type: "Restaurant",
  },
  {
    id: 16,
    title: "Juice",
    state: "Active",
    type: "Store",
  },
];

export default function AddOnsCategoryPage() {
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
            className="gap-2 bg-primary text-white py-2.5 px-4">
            <Plus className="w-4 h-4" />
            {activeTab === "addons"
              ? "Create Add-On Category"
              : "Create Food Category"}
          </Button>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("addons")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "addons"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}>
              Add-Ons
            </button>
            <button
              onClick={() => setActiveTab("food")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "food"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}>
              Food
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

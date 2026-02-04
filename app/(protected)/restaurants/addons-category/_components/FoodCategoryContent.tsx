"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createFoodColumns } from "./foodColumns";
import { FoodCategory } from "@/types/entities";
import { FoodCategoryDialog } from "./FoodCategoryDialog";

interface FoodCategoryContentProps {
  initialData: FoodCategory[];
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

export function FoodCategoryContent({
  initialData,
  isCreateOpen,
  setIsCreateOpen,
}: FoodCategoryContentProps) {
  const [editingCategory, setEditingCategory] = useState<FoodCategory | null>(
    null,
  );
  const [viewingCategory, setViewingCategory] = useState<FoodCategory | null>(
    null,
  );

  const handleEdit = (category: FoodCategory) => {
    setEditingCategory(category);
  };

  const handleViewDetails = (category: FoodCategory) => {
    setViewingCategory(category);
  };

  const handleCreate = (data: {
    title: string;
    type: "Restaurant" | "Store";
    image?: File;
  }) => {
    console.log("Creating food category:", data);
    // TODO: Implement API call to create category
  };

  const handleUpdate = (data: {
    title: string;
    type: "Restaurant" | "Store";
    image?: File;
  }) => {
    console.log("Updating food category:", editingCategory?.id, data);
    // TODO: Implement API call to update category
  };

  const columns = createFoodColumns(handleEdit, handleViewDetails);

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Food Categories
          </h2>
          <Button
            onClick={() => setIsCreateOpen(true)}
            usage="create">
            Create Food Category
          </Button>
        </div> */}
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={initialData}
            searchPlaceholder="Search by title, id..."
            searchableColumns={["id", "title"]}
          />
        </div>
      </div>

      {/* View Details Dialog */}
      <FoodCategoryDialog
        isOpen={!!viewingCategory}
        onClose={() => setViewingCategory(null)}
        category={viewingCategory}
        onSave={() => {}}
        mode="view"
      />

      {/* Create Dialog */}
      <FoodCategoryDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
        mode="create"
      />

      {/* Edit Dialog */}
      <FoodCategoryDialog
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        category={editingCategory}
        onSave={handleUpdate}
        mode="edit"
      />
    </>
  );
}

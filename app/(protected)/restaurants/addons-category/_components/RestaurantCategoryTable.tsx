"use client";

import { useState } from "react";
import { useRestaurantCategories } from "@/hooks/useRestaurantCategories";
import { DataTable } from "@/components/shared/DataTable";
import { createRestaurantCategoryColumns } from "./restaurantCategoryColumns";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { RestaurantCategoryDialog } from "./RestaurantCategoryDialog";
import type { FoodCategory } from "@/types/entities";

interface RestaurantCategoryTableProps {
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

export function RestaurantCategoryTable({
  isCreateOpen,
  setIsCreateOpen,
}: RestaurantCategoryTableProps) {
  const {
    data,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useRestaurantCategories();

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

  const handleDelete = async (id: number) => {
    deleteCategory(id);
  };

  const handleCreate = (data: { title: string; image?: File }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image);
    }

    createCategory(formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
      },
    });
  };

  const handleUpdate = (data: { title: string; image?: File }) => {
    if (!editingCategory) return;

    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) {
      formData.append("image", data.image);
    }

    updateCategory(
      { id: editingCategory.id, formData },
      {
        onSuccess: () => {
          setEditingCategory(null);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <TableSkeleton
        rows={10}
        columns={4}
        showHeader={true}
      />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load restaurant categories. Please try again.
        </div>
      </div>
    );
  }

  const columns = createRestaurantCategoryColumns(
    handleEdit,
    handleViewDetails,
    handleDelete,
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by title, id..."
        searchableColumns={["id", "title"]}
      />

      {/* View Details Dialog */}
      <RestaurantCategoryDialog
        isOpen={!!viewingCategory}
        onClose={() => setViewingCategory(null)}
        category={viewingCategory}
        onSave={() => {}}
        mode="view"
      />

      {/* Create Dialog */}
      <RestaurantCategoryDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
        mode="create"
      />

      {/* Edit Dialog */}
      <RestaurantCategoryDialog
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        category={editingCategory}
        onSave={handleUpdate}
        mode="edit"
      />
    </>
  );
}

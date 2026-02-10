"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createFoodColumns } from "./foodColumns";
import { FoodCategory } from "@/types/entities";
import { FoodCategoryDialog } from "./FoodCategoryDialog";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
    try {
      await api.delete(`/api/v1/admin/restaurant-categories/${id}`);
      toast.success("Restaurant category deleted successfully!");
      router.refresh();
    } catch (error: any) {
      console.error("Error deleting restaurant category:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete restaurant category",
      );
      throw error; // Re-throw to let the dialog handle it
    }
  };

  const handleCreate = async (data: {
    title: string;
    type: "Restaurant" | "Store";
    image?: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image) {
        formData.append("image", data.image);
      }

      await api.post("/api/v1/admin/restaurant-categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Restaurant category created successfully!");
      setIsCreateOpen(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error creating restaurant category:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create restaurant category",
      );
    }
  };

  const handleUpdate = async (data: {
    title: string;
    type: "Restaurant" | "Store";
    image?: File;
  }) => {
    if (!editingCategory) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image) {
        formData.append("image", data.image);
      }

      await api.patch(
        `/api/v1/admin/restaurant-categories/${editingCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Restaurant category updated successfully!");
      setEditingCategory(null);
      router.refresh();
    } catch (error: any) {
      console.error("Error updating restaurant category:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to update restaurant category",
      );
    }
  };

  const columns = createFoodColumns(
    handleEdit,
    handleViewDetails,
    handleDelete,
  );

  return (
    <>
      <div className="flex flex-col gap-5">
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

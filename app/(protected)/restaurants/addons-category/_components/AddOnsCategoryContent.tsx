"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { AddOnCategory } from "@/types/entities";
import { AddOnsCategoryDialog } from "./AddOnsCategoryDialog";
import { useAddOnCategories } from "@/hooks/useAddOnCategories";

interface AddOnsCategoryContentProps {
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

export function AddOnsCategoryContent({
  isCreateOpen,
  setIsCreateOpen,
}: AddOnsCategoryContentProps) {
  const router = useRouter();
  const [editingCategory, setEditingCategory] = useState<AddOnCategory | null>(
    null,
  );

  const {
    data,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating,
  } = useAddOnCategories();

  const handleEdit = (category: AddOnCategory) => {
    setEditingCategory(category);
  };

  const handleRowClick = (category: AddOnCategory) => {
    router.push(`/restaurants/addons-category/${category.id}`);
  };

  const handleCreate = (data: { title: string; status: string }) => {
    // Do nothing - just close dialog
    setIsCreateOpen(false);
  };

  const handleUpdate = (data: { title: string; status: string }) => {
    // Do nothing - just close dialog
    setEditingCategory(null);
  };

  const handleDelete = (id: number) => {
    // Do nothing - delete confirmation dialog will handle closing itself
  };

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={data}
            searchPlaceholder="Search by title, id..."
            searchableColumns={["id", "title"]}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Create Dialog */}
      <AddOnsCategoryDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
      />

      {/* Edit Dialog */}
      <AddOnsCategoryDialog
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        category={editingCategory}
        onSave={handleUpdate}
      />
    </>
  );
}

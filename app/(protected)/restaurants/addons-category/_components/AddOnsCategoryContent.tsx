"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { AddOnCategory } from "@/types/entities";
import { AddOnsCategoryDialog } from "./AddOnsCategoryDialog";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

interface AddOnsCategoryContentProps {
  initialData: AddOnCategory[];
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

export function AddOnsCategoryContent({
  initialData,
  isCreateOpen,
  setIsCreateOpen,
}: AddOnsCategoryContentProps) {
  const router = useRouter();
  const [editingCategory, setEditingCategory] = useState<AddOnCategory | null>(
    null,
  );

  const handleEdit = (category: AddOnCategory) => {
    setEditingCategory(category);
  };

  const handleRowClick = (category: AddOnCategory) => {
    router.push(`/restaurants/addons-category/${category.id}`);
  };

  const handleCreate = (title: string) => {
    console.log("Creating add-on category:", title);
    // TODO: Implement API call to create category
  };

  const handleUpdate = (title: string) => {
    console.log("Updating add-on category:", editingCategory?.id, title);
    // TODO: Implement API call to update category
  };

  const columns = createColumns(handleEdit);

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add-Ons Categories
          </h2>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="gap-2 bg-primary text-white py-2.5 px-4">
            <Plus className="w-4 h-4" />
            Create Add-On Category
          </Button>
        </div> */}
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={initialData}
            searchPlaceholder="Search by title, id..."
            searchableColumns={["id", "title"]}
            onRowClick={handleRowClick}
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

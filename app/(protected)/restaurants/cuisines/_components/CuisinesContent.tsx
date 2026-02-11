"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { Cuisine } from "@/types/entities";
import { CuisineDialog } from "./CuisineDialog";
import { CuisineDetailsDialog } from "./CuisineDetailsDialog";
import Button from "@/components/ui/Button";
import PageTitle from "@/components/common/PageTitle";
import { useCuisines } from "@/hooks/useCuisines";

export function CuisinesContent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState<Cuisine | null>(null);
  const [detailsCuisine, setDetailsCuisine] = useState<Cuisine | null>(null);

  const {
    data,
    isLoading,
    createCuisine,
    updateCuisine,
    deleteCuisine,
    isCreating,
  } = useCuisines();

  const handleEdit = (cuisine: Cuisine) => {
    setEditingCuisine(cuisine);
  };

  const handleRowClick = (cuisine: Cuisine) => {
    setDetailsCuisine(cuisine);
  };

  const handleCreate = (formData: FormData) => {
    createCuisine(formData);
  };

  const handleUpdate = (formData: FormData) => {
    if (editingCuisine) {
      updateCuisine({ id: editingCuisine.id, formData });
    }
  };

  const handleDelete = (id: number) => {
    deleteCuisine(id);
  };

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <PageTitle title="Cuisines Management" />
          <Button
            onClick={() => setIsCreateOpen(true)}
            usage="create"
            disabled={isCreating}>
            Create Cuisine
          </Button>
        </div>
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <DataTable
            columns={columns}
            data={data}
            searchPlaceholder="Search cuisine by title, id..."
            searchableColumns={["id", "title"]}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Details Dialog */}
      <CuisineDetailsDialog
        isOpen={!!detailsCuisine}
        onClose={() => setDetailsCuisine(null)}
        cuisine={detailsCuisine}
      />

      {/* Create Dialog */}
      <CuisineDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreate}
      />

      {/* Edit Dialog */}
      <CuisineDialog
        isOpen={!!editingCuisine}
        onClose={() => setEditingCuisine(null)}
        cuisine={editingCuisine}
        onSave={handleUpdate}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { Cuisine } from "@/types/entities";
import { CuisineDialog } from "./CuisineDialog";
import { CuisineDetailsDialog } from "./CuisineDetailsDialog";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";

interface CuisinesContentProps {
  initialData: Cuisine[];
}

export function CuisinesContent({ initialData }: CuisinesContentProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState<Cuisine | null>(null);
  const [detailsCuisine, setDetailsCuisine] = useState<Cuisine | null>(null);

  const handleEdit = (cuisine: Cuisine) => {
    setEditingCuisine(cuisine);
  };

  const handleRowClick = (cuisine: Cuisine) => {
    setDetailsCuisine(cuisine);
  };

  const handleCreate = (title: string) => {
    console.log("Creating cuisine:", title);
    // TODO: Implement API call to create cuisine
    // For now, just close the dialog
  };

  const handleUpdate = (title: string) => {
    console.log("Updating cuisine:", editingCuisine?.id, title);
    // TODO: Implement API call to update cuisine
    // For now, just close the dialog
  };

  const columns = createColumns(handleEdit);

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Cuisines Management" />
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="gap-2 bg-primary text-white">
            <Plus className="w-4 h-4" />
            Create Cuisine
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={initialData}
          searchPlaceholder="Search cuisine by title, id..."
          searchableColumns={["id", "title"]}
          onRowClick={handleRowClick}
        />
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

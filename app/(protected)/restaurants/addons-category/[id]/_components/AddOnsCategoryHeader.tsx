"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { AddOnCategory } from "@/types/entities";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { useState } from "react";
import { AddOnsCategoryDialog } from "../../_components/AddOnsCategoryDialog";
import PageTitle from "@/components/common/PageTitle";

interface AddOnsCategoryHeaderProps {
  category: AddOnCategory;
}

export function AddOnsCategoryHeader({ category }: AddOnsCategoryHeaderProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpdate = (title: string) => {
    console.log("Updating category:", category.id, title);
    // TODO: Implement API call
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header with Back Button and Actions */}
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-lg p-5 border justify-between">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => router.push("/restaurants/addons-category")}
              className="flex items-center gap-2 text-gray-600 p-2 rounded-full border dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <PageTitle title="Fresh (fast serve)" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              usage="edit"
              onClick={() => setIsEditOpen(true)}>
              Edit
            </Button>
            <DeleteConfirmationDialog
              itemType="Add-On Category"
              itemName={category.title}
              onSuccess={() => {
                router.push("/restaurants/addons-category");
              }}
              trigger={<Button usage="delete">Delete</Button>}
            />
          </div>
        </div>

        {/* Category Details */}
        <div className="border-t bg-white dark:bg-gray-900 rounded-lg p-5 border pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ID
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {category.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Title
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {category.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Created On
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {category.createdOn}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Created By
              </label>
              <p className="mt-1 text-base text-gray-800 dark:text-white/90">
                {category.createdBy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <AddOnsCategoryDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        category={category}
        onSave={handleUpdate}
      />
    </>
  );
}

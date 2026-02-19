"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { CreateFAQModal } from "./CreateFAQModal";
import { FAQDetailModal } from "./FAQDetailModal";
import type { FAQ, UpdateFAQRequest } from "@/types/entities";
import { useFAQs } from "@/hooks/useFAQs";
import type { CreateFAQRequest } from "@/hooks/useFAQs";

export function FAQsContent() {
  const {
    data: faqs,
    isLoading,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    isCreating,
    isUpdating,
    isDeleting,
  } = useFAQs();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (faq: FAQ) => {
    setSelectedFAQ(faq);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteFAQ(deleteId, {
        onSuccess: () => {
          setShowDeleteConfirm(false);
          setDeleteId(null);
        },
        onError: () => {
          setShowDeleteConfirm(false);
          setDeleteId(null);
        },
      });
    }
  };

  const handleCreate = (payload: CreateFAQRequest) => {
    createFAQ(payload);
  };

  const handleUpdate = (id: number, payload: UpdateFAQRequest) => {
    updateFAQ({ id, payload });
  };

  const columns = createColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              FAQs
            </h1>
          </div>
          <Button
            size="sm"
            usage="create"
            disabled={isCreating}
            onClick={() => {
              setEditingFAQ(null);
              setIsModalOpen(true);
            }}
            className="gap-2">
            Create FAQ
          </Button>
        </div>

        {/* FAQs Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={faqs}
            searchPlaceholder="Search FAQs..."
            searchableColumns={["question", "answer", "category"]}
            enableSearch={true}
            isLoading={isLoading}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CreateFAQModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFAQ(null);
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editData={editingFAQ}
        isSubmitting={editingFAQ ? isUpdating : isCreating}
      />

      {/* Detail Modal */}
      <FAQDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedFAQ(null);
        }}
        faq={selectedFAQ}
        onEdit={(faq) => {
          setIsDetailModalOpen(false);
          setSelectedFAQ(null);
          handleEdit(faq);
        }}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              if (!isDeleting) setShowDeleteConfirm(false);
            }}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Delete FAQ?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteId(null);
                }}
                disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700">
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

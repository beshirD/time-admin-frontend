"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { CreateFAQModal } from "./CreateFAQModal";
import { FAQDetailModal } from "./FAQDetailModal";
import type { FAQ } from "@/types/entities";

// Mock data
const mockFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Select your favorite restaurant, browse the menu, add items to your cart, and proceed to checkout. You can pay online or choose cash on delivery",
    state: "Active",
    createdOn: "2025-10-07T13:01:34Z",
  },
  {
    id: 2,
    question: "here it is",
    answer: "new answers",
    state: "Active",
    createdOn: "2025-05-21T11:45:21Z",
  },
  {
    id: 3,
    question: "here it is",
    answer: "new answer",
    state: "Active",
    createdOn: "2025-05-21T11:45:20Z",
  },
  {
    id: 4,
    question: "test faq",
    answer: "this is",
    state: "Active",
    createdOn: "2025-05-21T11:44:27Z",
  },
];

export function FAQsContent() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setFaqs((prev) => prev.filter((f) => f.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleCreateOrUpdate = (data: Omit<FAQ, "id" | "createdOn">) => {
    if (editingFAQ) {
      // Update existing FAQ
      setFaqs((prev) =>
        prev.map((f) => (f.id === editingFAQ.id ? { ...f, ...data } : f)),
      );
      setEditingFAQ(null);
    } else {
      // Create new FAQ
      const newFAQ: FAQ = {
        ...data,
        id: faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) + 1 : 1,
        createdOn: new Date().toISOString(),
      };
      setFaqs([newFAQ, ...faqs]);
    }
  };

  const columns = createColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header with Buttons */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              FAQs
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              usage="create"
              onClick={() => {
                setEditingFAQ(null);
                setIsCreateModalOpen(true);
              }}
              className="gap-2">
              Create FAQ
            </Button>
          </div>
        </div>

        {/* FAQs Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={faqs}
            searchPlaceholder="Search FAQs..."
            searchableColumns={["question", "answer"]}
            enableSearch={true}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      <CreateFAQModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingFAQ(null);
        }}
        onSubmit={handleCreateOrUpdate}
        editData={editingFAQ}
      />

      {/* Detail Modal */}
      <FAQDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedFAQ(null);
        }}
        faq={selectedFAQ}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDeleteConfirm(false)}
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
                }}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

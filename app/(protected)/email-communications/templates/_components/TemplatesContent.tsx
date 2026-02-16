"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { AddTemplateModal } from "./AddTemplateModal";
import { ViewTemplateModal } from "./ViewTemplateModal";
import type { EmailTemplate } from "@/types/entities";

// Mock data
const mockTemplates: EmailTemplate[] = [
  {
    id: 1,
    title: "check 121",
    description: "<p>check 121 is out</p>",
    state: "Active",
    type: "Email",
    createdOn: "2026-02-16T15:15:37Z",
    createdBy: "Admins",
  },
  {
    id: 2,
    title: "Welcome Email",
    description:
      "<p>Welcome to our platform! We're excited to have you here.</p>",
    state: "Active",
    type: "Email",
    createdOn: "2026-02-15T10:30:00Z",
    createdBy: "Admins",
  },
  {
    id: 3,
    title: "Password Reset",
    description: "<p>Click the link below to reset your password.</p>",
    state: "Active",
    type: "Email",
    createdOn: "2026-02-14T14:20:15Z",
    createdBy: "System",
  },
  {
    id: 4,
    title: "Order Confirmation",
    description:
      "<p>Thank you for your order! Your order has been confirmed.</p>",
    state: "New",
    type: "Email",
    createdOn: "2026-02-13T09:45:30Z",
    createdBy: "Admins",
  },
  {
    id: 5,
    title: "Newsletter Template",
    description: "<p>Monthly newsletter with latest updates and news.</p>",
    state: "Active",
    type: "Email",
    createdOn: "2026-02-12T16:10:00Z",
    createdBy: "Marketing Team",
  },
];

export function TemplatesContent() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(
    null,
  );
  const [viewingTemplate, setViewingTemplate] = useState<EmailTemplate | null>(
    null,
  );
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (template: EmailTemplate) => {
    setViewingTemplate(template);
    setIsViewModalOpen(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setTemplates((prev) => prev.filter((t) => t.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleAddTemplate = (
    data: Omit<EmailTemplate, "id" | "createdOn" | "createdBy" | "type">,
  ) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((t) => (t.id === editingTemplate.id ? { ...t, ...data } : t)),
      );
    } else {
      // Add new template
      const newTemplate: EmailTemplate = {
        ...data,
        id: templates.length + 1,
        type: "Email",
        createdOn: new Date().toISOString(),
        createdBy: "Admins",
      };
      setTemplates([...templates, newTemplate]);
    }
    setEditingTemplate(null);
  };

  const handleClone = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setIsAddModalOpen(true);
  };

  const handleClearAll = () => {
    setTemplates([]);
    setShowClearConfirm(false);
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
              Email Templates
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              usage="create"
              onClick={() => {
                setEditingTemplate(null);
                setIsAddModalOpen(true);
              }}
              className="gap-2">
              Add New Template
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowClearConfirm(true)}
              className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Templates
            </Button>
          </div>
        </div>

        {/* Templates Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={templates}
            searchPlaceholder="Search templates..."
            searchableColumns={["title"]}
            enableSearch={true}
            enableColumnVisibility={false}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTemplate(null);
        }}
        onSubmit={handleAddTemplate}
        editData={editingTemplate}
      />

      {/* View Modal */}
      <ViewTemplateModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingTemplate(null);
        }}
        template={viewingTemplate}
        onClone={handleClone}
      />

      {/* Clear Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowClearConfirm(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Clear All Templates?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will remove all email templates. This action cannot be
              undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowClearConfirm(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleClearAll}
                className="bg-red-600 hover:bg-red-700">
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Delete Template?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this template? This action cannot
              be undone.
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

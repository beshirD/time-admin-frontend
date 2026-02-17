"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { UnsubscribeEmailModal } from "./UnsubscribeEmailModal";
import { UnsubscribeEmailDetailModal } from "./UnsubscribeEmailDetailModal";
import type { UnsubscribeEmail } from "@/types/entities";

// Mock data
const mockUnsubscribeEmails: UnsubscribeEmail[] = [
  {
    id: 4,
    email: "admin@gmail.com",
    state: "Deactivate",
    createdOn: "2026-02-16T18:49:03Z",
    createdBy: "Admins",
  },
  {
    id: 3,
    email: "check121@sh.dev",
    state: "Active",
    createdOn: "2026-02-16T15:16:22Z",
    createdBy: "Admins",
  },
  {
    id: 2,
    email: "fayomuhe5@gmail.com",
    state: "Deactivate",
    createdOn: "2025-11-07T18:20:38Z",
    createdBy: "Admins",
  },
  {
    id: 1,
    email: "admin@toxsl.in",
    state: "Deactivate",
    createdOn: "2025-05-29T16:48:55Z",
    createdBy: "Admins",
  },
];

export function UnsubscribeEmailsContent() {
  const [emails, setEmails] = useState<UnsubscribeEmail[]>(
    mockUnsubscribeEmails,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<{ email: string } | null>(
    null,
  );
  const [selectedEmail, setSelectedEmail] = useState<UnsubscribeEmail | null>(
    null,
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (email: UnsubscribeEmail) => {
    setSelectedEmail(email);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (email: UnsubscribeEmail) => {
    setEditingEmail({ email: email.email });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setEmails((prev) => prev.filter((e) => e.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleToggleSubscription = (email: UnsubscribeEmail) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === email.id
          ? { ...e, state: e.state === "Active" ? "Deactivate" : "Active" }
          : e,
      ),
    );
  };

  const handleAddEmail = (emailAddress: string) => {
    if (editingEmail) {
      // Update existing email
      setEmails((prev) =>
        prev.map((e) =>
          e.email === editingEmail.email ? { ...e, email: emailAddress } : e,
        ),
      );
      setEditingEmail(null);
    } else {
      // Add new email
      const newEmail: UnsubscribeEmail = {
        id: emails.length > 0 ? Math.max(...emails.map((e) => e.id)) + 1 : 1,
        email: emailAddress,
        state: "Deactivate",
        createdOn: new Date().toISOString(),
        createdBy: "Admins",
      };
      setEmails([newEmail, ...emails]);
    }
  };

  const columns = createColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onToggleSubscription: handleToggleSubscription,
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header with Buttons */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Unsubscribe Emails
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              usage="create"
              onClick={() => {
                setEditingEmail(null);
                setIsAddModalOpen(true);
              }}
              className="gap-2">
              Unsubscribe Email
            </Button>
          </div>
        </div>

        {/* Unsubscribe Emails Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={emails}
            searchPlaceholder="Search unsubscribe emails..."
            searchableColumns={["email", "createdBy"]}
            enableSearch={true}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <UnsubscribeEmailModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingEmail(null);
        }}
        onSubmit={handleAddEmail}
        editData={editingEmail}
      />

      {/* Detail Modal */}
      <UnsubscribeEmailDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEmail(null);
        }}
        email={selectedEmail}
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
              Delete Unsubscribe Email?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this unsubscribe email? This
              action cannot be undone.
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

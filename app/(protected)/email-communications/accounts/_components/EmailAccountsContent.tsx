"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { AddEmailModal } from "./AddEmailModal";
import type { EmailAccount } from "@/types/entities";

// Mock data
const mockEmailAccounts: EmailAccount[] = [
  {
    id: 1,
    title: "test account",
    email: "admin@solviatechnology.com",
    password: "Admin@2025",
    server: "mail.solviatechnology.com",
    port: 465,
    encryption: "SSL",
    limitPerEmail: null,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-06-12T17:19:30Z",
    updatedOn: "2025-06-12T17:19:30Z",
    createdBy: "Admin",
  },
  {
    id: 2,
    title: "Support Email",
    email: "support@timedelivery.com",
    password: "Support@2025",
    server: "mail.timedelivery.com",
    port: 587,
    encryption: "TLS",
    limitPerEmail: 100,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-05-20T10:30:15Z",
    updatedOn: "2025-06-01T14:22:10Z",
    createdBy: "Admin",
  },
  {
    id: 3,
    title: "Marketing Campaigns",
    email: "marketing@timedelivery.com",
    password: "Market@2025",
    server: "smtp.gmail.com",
    port: 465,
    encryption: "SSL",
    limitPerEmail: 500,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-04-15T09:15:45Z",
    updatedOn: "2025-05-10T16:40:30Z",
    createdBy: "Marketing Team",
  },
  {
    id: 4,
    title: "Notifications",
    email: "noreply@timedelivery.com",
    password: "Notify@2025",
    server: "mail.timedelivery.com",
    port: 465,
    encryption: "SSL",
    limitPerEmail: 1000,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-03-10T08:00:00Z",
    updatedOn: "2025-03-10T08:00:00Z",
    createdBy: "System",
  },
  {
    id: 5,
    title: "Customer Service",
    email: "service@timedelivery.com",
    password: "Service@2025",
    server: "mail.timedelivery.com",
    port: 587,
    encryption: "TLS",
    limitPerEmail: 200,
    state: "Active",
    type: "SMTP",
    createdOn: "2025-02-28T12:45:20Z",
    updatedOn: "2025-04-15T11:30:00Z",
    createdBy: "Admin",
  },
  {
    id: 6,
    title: "Billing Department",
    email: "billing@timedelivery.com",
    password: "Billing@2025",
    server: "smtp.office365.com",
    port: 587,
    encryption: "TLS",
    limitPerEmail: 150,
    state: "Inactive",
    type: "SMTP",
    createdOn: "2025-01-20T14:20:10Z",
    updatedOn: "2025-02-05T09:15:30Z",
    createdBy: "Finance Team",
  },
];

export function EmailAccountsContent() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [accounts, setAccounts] = useState<EmailAccount[]>(mockEmailAccounts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<EmailAccount | null>(
    null,
  );
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (id: number) => {
    router.push(`/email-communications/accounts/${id}`);
  };

  const handleEdit = (account: EmailAccount) => {
    setEditingAccount(account);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setAccounts((prev) => prev.filter((a) => a.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleAddAccount = (
    data: Omit<EmailAccount, "id" | "createdOn" | "updatedOn" | "createdBy">,
  ) => {
    const newAccount: EmailAccount = {
      ...data,
      id: accounts.length + 1,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      createdBy: "Admin",
    };
    setAccounts([...accounts, newAccount]);
    setEditingAccount(null);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Importing file:", file.name);
      // Handle file import logic here
    }
  };

  const handleClearAll = () => {
    setAccounts([]);
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
              Email Accounts
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleImport}
              className="gap-2">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button
              size="sm"
              usage="create"
              onClick={() => {
                setEditingAccount(null);
                setIsAddModalOpen(true);
              }}
              className="gap-2">
              Add New Email
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowClearConfirm(true)}
              className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Email
            </Button>
          </div>
        </div>

        {/* Email Accounts Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={accounts}
            searchPlaceholder="Search email accounts..."
            searchableColumns={["title", "email", "server"]}
            enableSearch={true}
            enableColumnVisibility={false}
            onRowClick={(row) => handleView(row.id)}
          />
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Add/Edit Modal */}
      <AddEmailModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingAccount(null);
        }}
        onSubmit={handleAddAccount}
        editData={editingAccount}
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
              Clear All Email Accounts?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will remove all email accounts. This action cannot be undone.
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
              Delete Email Account?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this email account? This action
              cannot be undone.
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

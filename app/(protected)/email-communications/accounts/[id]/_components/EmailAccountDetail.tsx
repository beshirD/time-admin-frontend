"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, FileDown, TestTube, Trash2, Edit } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createEmailHistoryColumns } from "./emailHistoryColumns";
import { AddEmailModal } from "../../_components/AddEmailModal";
import type { EmailAccount, EmailCommunication } from "@/types/entities";

// Mock email communications data
const mockEmailCommunications: EmailCommunication[] = [
  {
    id: 24196,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-12-19T11:10:05Z",
    createdOn: "2025-12-19T11:09:42Z",
  },
  {
    id: 24191,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-18T16:30:05Z",
    createdOn: "2025-11-18T16:23:56Z",
  },
  {
    id: 24190,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-17T14:10:04Z",
    createdOn: "2025-11-17T14:09:10Z",
  },
  {
    id: 24183,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-12T23:40:05Z",
    createdOn: "2025-11-12T23:31:14Z",
  },
  {
    id: 24182,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-11T16:00:05Z",
    createdOn: "2025-11-11T15:54:57Z",
  },
  {
    id: 24181,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-11T15:30:06Z",
    createdOn: "2025-11-11T15:29:11Z",
  },
  {
    id: 24179,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-10T18:40:04Z",
    createdOn: "2025-11-10T18:31:28Z",
  },
  {
    id: 24178,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-10T18:30:04Z",
    createdOn: "2025-11-10T18:25:27Z",
  },
  {
    id: 24177,
    subject: "New Restaurant Registerd Successfully",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-08T18:10:04Z",
    createdOn: "2025-11-08T18:06:07Z",
  },
  {
    id: 24176,
    subject: "0: No authentication token provided",
    to: "fayomuhe5@gmail.com",
    state: "Sent",
    sentOn: "2025-11-07T18:20:17Z",
    createdOn: "2025-11-07T18:18:59Z",
  },
];

interface EmailAccountDetailProps {
  account: EmailAccount;
}

export function EmailAccountDetail({ account }: EmailAccountDetailProps) {
  const router = useRouter();
  const [emails] = useState<EmailCommunication[]>(mockEmailCommunications);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleClone = (data: any) => {
    console.log("Cloning account with data:", data);
    setShowCloneModal(false);
    // Navigate back to list or show success
  };

  const handleEdit = (data: any) => {
    console.log("Updating account with data:", data);
    setShowEditModal(false);
  };

  const handleExport = () => {
    console.log("Exporting account data");
    // Implement export logic
  };

  const handleTest = () => {
    console.log("Testing email account");
    // Implement test logic
  };

  const handleDelete = () => {
    console.log("Deleting account");
    setShowDeleteConfirm(false);
    router.push("/email-communications/accounts");
  };

  const emailHistoryColumns = createEmailHistoryColumns({
    onView: (id) => console.log("View email:", id),
    onEdit: (email) => console.log("Edit email:", email),
    onDelete: (id) => console.log("Delete email:", id),
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {account.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {account.state}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCloneModal(true)}
              className="gap-2">
              <Copy className="w-4 h-4" />
              Clone
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
              className="gap-2">
              <FileDown className="w-4 h-4" />
              Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleTest}
              className="gap-2">
              <TestTube className="w-4 h-4" />
              Test
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="gap-2 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Account Information
            </h2>
            <Button
              size="sm"
              usage="edit"
              onClick={() => setShowEditModal(true)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                ID
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.id}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Title
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.title}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Email
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.email}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Password
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.password}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Server
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.server}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Port
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.port}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Encryption
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.encryption}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Limit Per Email
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.limitPerEmail || ""}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Type
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.type}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Created On
              </span>
              <span className="text-gray-900 dark:text-white">
                {new Date(account.createdOn).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Updated On
              </span>
              <span className="text-gray-900 dark:text-white">
                {new Date(account.updatedOn).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Created By
              </span>
              <span className="text-gray-900 dark:text-white">
                {account.createdBy}
              </span>
            </div>
          </div>
        </div>

        {/* Email History */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Email History
          </h2>
          <DataTable
            columns={emailHistoryColumns}
            data={emails}
            searchPlaceholder="Search emails..."
            searchableColumns={["subject", "to"]}
            enableSearch={true}
            enableColumnVisibility={false}
          />
        </div>
      </div>

      {/* Clone Modal */}
      <AddEmailModal
        isOpen={showCloneModal}
        onClose={() => setShowCloneModal(false)}
        onSubmit={handleClone}
        editData={account}
      />

      {/* Edit Modal */}
      <AddEmailModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEdit}
        editData={account}
      />

      {/* Delete Confirmation */}
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
                onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
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

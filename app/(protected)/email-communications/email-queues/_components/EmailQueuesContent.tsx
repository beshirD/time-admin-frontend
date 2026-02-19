"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import type { EmailQueue } from "@/types/entities";
import PageTitle from "@/components/common/PageTitle";

// Mock data
const mockEmailQueues: EmailQueue[] = [
  {
    id: 24203,
    subject: "New Restaurant Registerd Successfully",
    from: "amar.muni@gmail.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-15T15:20:04Z",
    createdOn: "2026-02-15T15:12:14Z",
    attempts: 0,
    message: "6382bad661df85b692a101bd23c41192@solviatechnology.com",
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24202,
    subject: "New Restaurant Registerd Successfully",
    from: "amar.munim@gmail.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-15T15:20:03Z",
    createdOn: "2026-02-15T15:11:52Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24201,
    subject: "New Restaurant Registerd Successfully",
    from: "nayf@google.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-09T20:30:07Z",
    createdOn: "2026-02-09T20:26:40Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24200,
    subject: "New Restaurant Registerd Successfully",
    from: "napoleon@bonaparte.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-09T20:30:06Z",
    createdOn: "2026-02-09T20:21:25Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24199,
    subject: "New Restaurant Registerd Successfully",
    from: "julie@google.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-09T20:30:05Z",
    createdOn: "2026-02-09T20:20:12Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24198,
    subject: "New Restaurant Registerd Successfully",
    from: "julie@herman.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-02-09T20:20:04Z",
    createdOn: "2026-02-09T20:19:40Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24197,
    subject: "New Restaurant Registerd Successfully",
    from: "1john.doe@example.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2026-01-09T19:50:04Z",
    createdOn: "2026-01-09T19:47:05Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24196,
    subject: "New Restaurant Registerd Successfully",
    from: "admin@solviatechnology.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-12-19T11:10:05Z",
    createdOn: "2025-12-19T11:09:42Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24195,
    subject: "New Restaurant Registerd Successfully",
    from: "hasdiner@gmail.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-29T13:50:05Z",
    createdOn: "2025-11-29T13:41:53Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24194,
    subject: "New Restaurant Registerd Successfully",
    from: "s11@gmail.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-20T11:00:07Z",
    createdOn: "2025-11-20T10:52:59Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
  {
    id: 24193,
    subject: "New Restaurant Registerd Successfully",
    from: "s@gmail.com",
    to: "admin@gmail.com",
    state: "Sent",
    sentOn: "2025-11-20T11:00:07Z",
    createdOn: "2025-11-20T10:52:23Z",
    attempts: 0,
    body: "<h1>New Restaurant Registration</h1><p>A new restaurant has been successfully registered.</p>",
  },
];

export function EmailQueuesContent() {
  const router = useRouter();
  const [emails, setEmails] = useState<EmailQueue[]>(mockEmailQueues);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (id: number) => {
    router.push(`/email-communications/email-queues/${id}`);
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

  const handleClearQueue = () => {
    setEmails([]);
    setShowClearConfirm(false);
  };

  const columns = createColumns({
    onView: handleView,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header with Button */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <PageTitle title="Email Queue" />
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowClearConfirm(true)}
              className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Queue
            </Button>
          </div>
        </div>

        {/* Email Queue Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={emails}
            searchPlaceholder="Search emails..."
            searchableColumns={["subject", "from", "to"]}
            enableSearch={true}
            onRowClick={(row) => handleView(row.id)}
          />
        </div>
      </div>

      {/* Clear Confirmation Dialog */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowClearConfirm(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Clear Email Queue?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will remove all emails from the queue. This action cannot be
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
                onClick={handleClearQueue}
                className="bg-red-600 hover:bg-red-700">
                Clear Queue
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
              Delete Email?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this email? This action cannot be
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

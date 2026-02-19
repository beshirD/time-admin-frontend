"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { CreateRestrictedAreaModal } from "./CreateRestrictedAreaModal";
import { RestrictedAreaDetailModal } from "./RestrictedAreaDetailModal";
import type { RestrictedArea } from "@/types/entities";
import { useRestrictedAreas } from "@/hooks/useRestrictedAreas";
import type {
  CreateRestrictedAreaRequest,
  UpdateRestrictedAreaRequest,
} from "@/hooks/useRestrictedAreas";

export function RestrictedAreasContent() {
  const {
    data: areas,
    isLoading,
    createArea,
    updateArea,
    deleteArea,
    isCreating,
    isUpdating,
    isDeleting,
  } = useRestrictedAreas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<RestrictedArea | null>(null);
  const [selectedArea, setSelectedArea] = useState<RestrictedArea | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleView = (area: RestrictedArea) => {
    setSelectedArea(area);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (area: RestrictedArea) => {
    setEditingArea(area);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteArea(deleteId, {
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

  const handleCreate = (payload: CreateRestrictedAreaRequest) => {
    createArea(payload);
  };

  const handleUpdate = (id: number, payload: UpdateRestrictedAreaRequest) => {
    updateArea({ id, payload });
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
              Restricted Areas
            </h1>
          </div>
          <Button
            size="sm"
            usage="create"
            disabled={isCreating}
            onClick={() => {
              setEditingArea(null);
              setIsModalOpen(true);
            }}>
            Create Restricted Area
          </Button>
        </div>

        {/* Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={areas}
            searchPlaceholder="Search restricted areas..."
            searchableColumns={["areaName"]}
            enableSearch={true}
            isLoading={isLoading}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CreateRestrictedAreaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingArea(null);
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editData={editingArea}
        isSubmitting={editingArea ? isUpdating : isCreating}
      />

      {/* Detail Modal */}
      <RestrictedAreaDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedArea(null);
        }}
        area={selectedArea}
        onEdit={(area) => {
          setIsDetailModalOpen(false);
          setSelectedArea(null);
          handleEdit(area);
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
              Delete Restricted Area?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this restricted area? This action
              cannot be undone.
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

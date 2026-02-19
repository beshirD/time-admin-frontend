"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { CreateRestrictedAreaModal } from "./CreateRestrictedAreaModal";
import { RestrictedAreaDetailModal } from "./RestrictedAreaDetailModal";
import type { RestrictedArea } from "@/types/entities";

// Mock data matching the spec
const mockAreas: RestrictedArea[] = [
  {
    id: 8,
    areaName: "jemo",
    startHour: "00:01:00",
    endHour: "23:58:00",
    status: "active",
    polygonWkt:
      "POLYGON((38.6937783551722 8.955378498795955,38.6937783551722 8.95088489776269,38.698952770305254 8.950863701399841,38.70210704810677 8.954721419092067,38.69998273856697 8.95711782418486,38.6937783551722 8.955378498795955))",
    visitorTimezone: "Asia/Kabul",
    currentTime: "04:24:11",
    restrictedNow: true,
    createdAt: "2025-10-21 02:38:07",
    updatedAt: "2025-10-21 02:38:07",
  },
  {
    id: 10,
    areaName: "JEMO 2",
    startHour: "09:00:00",
    endHour: "07:00:00",
    status: "inactive",
    visitorTimezone: "Asia/Kabul",
    currentTime: "04:24:11",
    restrictedNow: false,
    createdAt: "2025-10-22 08:15:00",
    updatedAt: "2025-10-22 08:15:00",
  },
  {
    id: 11,
    areaName: "demo 3",
    startHour: "10:00:00",
    endHour: "10:04:00",
    status: "active",
    visitorTimezone: "Asia/Kabul",
    currentTime: "04:24:11",
    restrictedNow: false,
    createdAt: "2025-10-23 10:00:00",
    updatedAt: "2025-10-23 10:00:00",
  },
  {
    id: 12,
    areaName: "check 121",
    startHour: "14:00:00",
    endHour: "15:00:00",
    status: "active",
    visitorTimezone: "Asia/Kabul",
    currentTime: "04:24:11",
    restrictedNow: false,
    createdAt: "2025-10-24 14:00:00",
    updatedAt: "2025-10-24 14:00:00",
  },
];

export function RestrictedAreasContent() {
  const [areas, setAreas] = useState<RestrictedArea[]>(mockAreas);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setAreas((prev) => prev.filter((a) => a.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleCreateOrUpdate = (
    data: Omit<
      RestrictedArea,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "visitorTimezone"
      | "currentTime"
      | "restrictedNow"
    >,
  ) => {
    if (editingArea) {
      setAreas((prev) =>
        prev.map((a) => (a.id === editingArea.id ? { ...a, ...data } : a)),
      );
      setEditingArea(null);
    } else {
      const newArea: RestrictedArea = {
        ...data,
        id: areas.length > 0 ? Math.max(...areas.map((a) => a.id)) + 1 : 1,
        visitorTimezone: "Asia/Kabul",
        currentTime: new Date().toTimeString().split(" ")[0],
        restrictedNow: false,
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        updatedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      };
      setAreas([newArea, ...areas]);
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
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border dark:bg-gray-900 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Restricted Areas
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              usage="create"
              onClick={() => {
                setEditingArea(null);
                setIsCreateModalOpen(true);
              }}
              className="gap-2">
              Create Restricted Area
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg">
          <DataTable
            columns={columns}
            data={areas}
            searchPlaceholder="Search restricted areas..."
            searchableColumns={["areaName"]}
            enableSearch={true}
            onRowClick={(row) => handleView(row)}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <CreateRestrictedAreaModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingArea(null);
        }}
        onSubmit={handleCreateOrUpdate}
        editData={editingArea}
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
            onClick={() => setShowDeleteConfirm(false)}
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

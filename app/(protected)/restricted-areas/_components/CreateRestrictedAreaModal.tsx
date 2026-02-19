"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { cn } from "@/lib/utils";
import type { RestrictedArea } from "@/types/entities";
import type {
  CreateRestrictedAreaRequest,
  UpdateRestrictedAreaRequest,
} from "@/hooks/useRestrictedAreas";

// Demo polygon until map integration — clearly marked as test data
const DEMO_POLYGON =
  "POLYGON((38.6937783551722 8.955378498795955,38.6937783551722 8.95088489776269,38.698952770305254 8.950863701399841,38.70210704810677 8.954721419092067,38.69998273856697 8.95711782418486,38.6937783551722 8.955378498795955))";

interface CreateRestrictedAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (payload: CreateRestrictedAreaRequest) => void;
  onUpdate?: (id: number, payload: UpdateRestrictedAreaRequest) => void;
  editData?: RestrictedArea | null;
  isSubmitting?: boolean;
}

export function CreateRestrictedAreaModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  editData,
  isSubmitting = false,
}: CreateRestrictedAreaModalProps) {
  const isEditing = !!editData;

  const [areaName, setAreaName] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [geoPolygon, setGeoPolygon] = useState(DEMO_POLYGON);
  const [errors, setErrors] = useState<{
    areaName?: string;
    startHour?: string;
    endHour?: string;
  }>({});

  useEffect(() => {
    if (editData) {
      setAreaName(editData.areaName);
      setStartHour(editData.startHour);
      setEndHour(editData.endHour);
      setStatus(editData.status);
      setGeoPolygon(editData.geoPolygon || DEMO_POLYGON);
    } else {
      setAreaName("");
      setStartHour("");
      setEndHour("");
      setStatus("active");
      setGeoPolygon(DEMO_POLYGON);
    }
    setErrors({});
  }, [editData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!areaName.trim()) newErrors.areaName = "Area name is required";
    if (!startHour) newErrors.startHour = "Start hour is required";
    if (!endHour) newErrors.endHour = "End hour is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = { areaName, geoPolygon, startHour, endHour, status };

    if (isEditing && onUpdate) {
      onUpdate(editData.id, payload);
    } else if (!isEditing && onCreate) {
      onCreate(payload);
    }

    handleClose();
  };

  const handleClose = () => {
    setAreaName("");
    setStartHour("");
    setEndHour("");
    setStatus("active");
    setGeoPolygon(DEMO_POLYGON);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[750px] m-4">
      <div className="relative border w-[680px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar max-h-[90vh]">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "Edit Restricted Area" : "Create Restricted Area"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {isEditing
              ? "Update the restricted area information"
              : "Define a new geographic area where orders are restricted"}
          </p>
        </div>

        <form
          className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="px-2 pb-3">
            <div className="grid grid-cols-1 gap-y-5">
              {/* Area Name */}
              <div>
                <Label>
                  Area Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  value={areaName}
                  onChange={(e) => {
                    setAreaName(e.target.value);
                    if (errors.areaName)
                      setErrors({ ...errors, areaName: undefined });
                  }}
                  placeholder="e.g. Merkato"
                  className={cn(
                    errors.areaName && "border-red-500 focus:ring-red-500",
                  )}
                />
                {errors.areaName && (
                  <p className="mt-1 text-sm text-red-500">{errors.areaName}</p>
                )}
              </div>

              {/* Start Hour / End Hour row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>
                    Start Hour <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    step="1"
                    value={startHour}
                    onChange={(e) => {
                      setStartHour(e.target.value);
                      if (errors.startHour)
                        setErrors({ ...errors, startHour: undefined });
                    }}
                    className={cn(
                      errors.startHour && "border-red-500 focus:ring-red-500",
                    )}
                  />
                  {errors.startHour && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.startHour}
                    </p>
                  )}
                </div>

                <div>
                  <Label>
                    End Hour <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="time"
                    step="1"
                    value={endHour}
                    onChange={(e) => {
                      setEndHour(e.target.value);
                      if (errors.endHour)
                        setErrors({ ...errors, endHour: undefined });
                    }}
                    className={cn(
                      errors.endHour && "border-red-500 focus:ring-red-500",
                    )}
                  />
                  {errors.endHour && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.endHour}
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <Label>Status</Label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "active" | "inactive")
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Map Placeholder */}
              <div>
                <Label>Draw Restricted Area on Map</Label>
                <div className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Map not yet integrated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use the polygon tool to draw the restricted area.
                    <br />
                    The coordinates will be saved automatically.
                  </p>
                </div>
              </div>

              {/* Geo Polygon (WKT) — pre-filled with demo value */}
              <div>
                <Label>
                  Geo Polygon (WKT){" "}
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Test polygon — replace when map is integrated
                  </span>
                </Label>
                <textarea
                  value={geoPolygon}
                  onChange={(e) => setGeoPolygon(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm font-mono bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleClose}
              type="button">
              Cancel
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Update Area"
                  : "Create Area"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

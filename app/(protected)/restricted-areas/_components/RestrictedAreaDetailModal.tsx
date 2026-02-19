"use client";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";
import type { RestrictedArea } from "@/types/entities";

interface RestrictedAreaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: RestrictedArea | null;
  onEdit?: (area: RestrictedArea) => void;
}

function DetailRow({
  label,
  value,
  isColSpan3,
}: {
  label: string;
  value: React.ReactNode;
  isColSpan3?: boolean;
}) {
  return (
    <div
      className={`flex flex-col py-3 gap-2 ${isColSpan3 ? "col-span-3" : ""}`}>
      <span className="text-gray-600 dark:text-gray-300 text-base">
        {label}
      </span>
      <span className="text-gray-900 dark:text-white text-base">{value}</span>
    </div>
  );
}

export function RestrictedAreaDetailModal({
  isOpen,
  onClose,
  area,
  onEdit,
}: RestrictedAreaDetailModalProps) {
  if (!area) return null;

  const statusColorClass =
    area.status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[750px] m-4">
      <div className="relative border w-[850px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 no-scrollbar max-h-[90vh]">
        {/* Header */}
        <div className="px-2 pr-14">
          <div className="flex items-center gap-3">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Restricted Area Details
            </h4>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColorClass}`}>
              {area.status}
            </span>
          </div>
        </div>

        {/* Detail rows */}
        <div className="px-2 space-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailRow
            label="ID"
            value={area.id}
          />
          <DetailRow
            label="Area Name"
            value={area.areaName}
          />
          <DetailRow
            label="Start Hour"
            value={area.startHour}
          />
          <DetailRow
            label="End Hour"
            value={area.endHour}
          />
          <DetailRow
            label="Status"
            value={area.status}
          />
          <DetailRow
            label="Created At"
            value={formatDate(area.createdAt)}
          />
          <DetailRow
            label="Updated At"
            value={formatDate(area.updatedAt)}
          />
          <DetailRow
            isColSpan3={true}
            label="Geo Polygon (WKT)"
            value={
              <span className="font-mono text-xs break-all">
                {area.geoPolygon}
              </span>
            }
          />
        </div>

        {/* Map placeholder */}
        <div className="px-2 mt-5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Restricted Area on Map
          </p>
          <div className="w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-2 py-14 px-4 text-center">
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
              The polygon will be visualised here once the map is connected.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-2 mt-6">
          {onEdit && (
            <Button
              size="sm"
              usage="edit"
              onClick={() => {
                onClose();
                onEdit(area);
              }}>
              Edit
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

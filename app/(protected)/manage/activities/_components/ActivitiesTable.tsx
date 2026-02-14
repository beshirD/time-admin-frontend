"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import type { Activity } from "@/types/entities";
import { ActivityDetailDialog } from "./ActivityDetailDialog";

// Mock data based on the provided sample
const mockActivities: Activity[] = [
  {
    id: 263912,
    content:
      "Modified Variable Updated On : 2025-06-12 14:10:12==>2026-02-13 16:29:00",
    userIp: "51.159.198.48",
    userAgent: "Chrome 136 on Linux",
    state: "Active",
    createdOn: "Feb 13, 2026, 7:29:00 PM",
    createdBy: "Admins",
    modelType: "app\\modules\\settings\\models\\Variable",
    model: "8",
    type: "TYPE1",
  },
  {
    id: 263911,
    content:
      "Modified Variable Updated On : 2025-06-12 14:10:12==>2026-02-13 16:29:00",
    userIp: "51.159.198.48",
    userAgent: "Chrome 136 on Linux",
    state: "Active",
    createdOn: "Feb 13, 2026, 7:29:00 PM",
    createdBy: "Admins",
    modelType: "app\\modules\\settings\\models\\Variable",
    model: "8",
    type: "TYPE1",
  },
  {
    id: 263910,
    content:
      "Modified Variable Value Updated On : 2025-06-12 14:10:12==>2026-02-13 16:29:00",
    userIp: "51.159.198.48",
    userAgent: "Chrome 136 on Linux",
    state: "Active",
    createdOn: "Feb 13, 2026, 7:29:00 PM",
    createdBy: "Admins",
    modelType: "app\\modules\\settings\\models\\Variable",
    model: "8",
    type: "TYPE1",
  },
  {
    id: 263909,
    content: "Created new Variable",
    userIp: "51.159.198.48",
    userAgent: "Chrome 136 on Linux",
    state: "Active",
    createdOn: "Feb 13, 2026, 7:28:48 PM",
    createdBy: "Admins",
    modelType: "app\\modules\\settings\\models\\Variable",
    model: "7",
    type: "TYPE1",
  },
];

export function ActivitiesTable() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const handleViewClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDetailDialogOpen(true);
  };

  const handleRowClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsDetailDialogOpen(true);
  };

  const columns = createColumns(handleViewClick);

  return (
    <>
      <DataTable
        columns={columns}
        data={mockActivities}
        searchPlaceholder="Search by ID, content, IP, user agent..."
        searchableColumns={[
          "id",
          "content",
          "userIp",
          "userAgent",
          "state",
          "createdBy",
        ]}
        onRowClick={handleRowClick}
      />

      <ActivityDetailDialog
        activity={selectedActivity}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />
    </>
  );
}

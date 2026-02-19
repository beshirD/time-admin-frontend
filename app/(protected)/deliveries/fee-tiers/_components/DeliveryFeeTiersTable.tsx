"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createDeliveryFeeTierColumns } from "./deliveryFeeTierColumns";
import type { DeliveryFeeTier } from "@/types/entities";
import { TierDialog } from "./TierDialog";
import { DeliveryFeeSettingsDialog } from "./DeliveryFeeSettingsDialog";
import Button from "@/components/ui/Button";
import { Settings } from "lucide-react";
import PageTitle from "@/components/common/PageTitle";

// Mock data based on the provided sample
const mockTiers: DeliveryFeeTier[] = [
  {
    id: 1,
    minDistance: 10.0,
    maxDistance: 13.0,
    price: 35.0,
    sortOrder: 0,
    state: "Active",
  },
  {
    id: 2,
    minDistance: 0.0,
    maxDistance: 1.0,
    price: 20.0,
    sortOrder: 10,
    state: "Active",
  },
  {
    id: 3,
    minDistance: 1.0,
    maxDistance: 2.0,
    price: 22.0,
    sortOrder: 20,
    state: "Active",
  },
  {
    id: 4,
    minDistance: 2.0,
    maxDistance: 3.0,
    price: 23.0,
    sortOrder: 30,
    state: "Active",
  },
  {
    id: 5,
    minDistance: 3.0,
    maxDistance: 5.0,
    price: 25.0,
    sortOrder: 40,
    state: "Active",
  },
  {
    id: 6,
    minDistance: 5.0,
    maxDistance: 8.0,
    price: 30.0,
    sortOrder: 50,
    state: "Active",
  },
  {
    id: 7,
    minDistance: 8.0,
    maxDistance: 10.0,
    price: 32.0,
    sortOrder: 60,
    state: "Active",
  },
];

export function DeliveryFeeTiersTable() {
  const [selectedTier, setSelectedTier] = useState<DeliveryFeeTier | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const handleEditClick = (tier: DeliveryFeeTier) => {
    setSelectedTier(tier);
    setIsEditDialogOpen(true);
  };

  const columns = createDeliveryFeeTierColumns(handleEditClick);

  return (
    <>
      {/* Table */}
      <DataTable
        columns={columns}
        data={mockTiers}
        searchPlaceholder="Search by min/max distance, price..."
        searchableColumns={["id", "minDistance", "maxDistance", "price"]}
      />

      {/* Create Dialog */}
      <TierDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {/* Edit Dialog */}
      <TierDialog
        tier={selectedTier}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedTier(null);
        }}
      />

      {/* Settings Dialog */}
      <DeliveryFeeSettingsDialog
        isOpen={isSettingsDialogOpen}
        onClose={() => setIsSettingsDialogOpen(false)}
      />
    </>
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/ui/Button";
import { DeliveryFeeTier } from "@/types/entities";
import { DeleteTierDialog } from "./DeleteTierDialog";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Active}`}>
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({
  tier,
  onEditClick,
}: {
  tier: DeliveryFeeTier;
  onEditClick: (tier: DeliveryFeeTier) => void;
}) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="edit"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick(tier);
        }}>
        Edit
      </Button>

      <DeleteTierDialog
        tierId={tier.id}
        onDeleteSuccess={() => {
          // Optionally refresh the table
        }}>
        <Button
          usage="delete"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          Delete
        </Button>
      </DeleteTierDialog>
    </div>
  );
};

export const createDeliveryFeeTierColumns = (
  onEditClick: (tier: DeliveryFeeTier) => void,
): ColumnDef<DeliveryFeeTier>[] => [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "minDistance",
    header: "Min Distance (km, inclusive)",
    cell: ({ row }) => (
      <div className="font-medium">
        {Number(row.getValue("minDistance")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "maxDistance",
    header: "Max Distance (km, exclusive, leave empty for max tier)",
    cell: ({ row }) => {
      const maxDistance = row.getValue("maxDistance") as number | null;
      return (
        <div className="font-medium">
          {maxDistance !== null ? Number(maxDistance).toFixed(2) : "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price (AFN)",
    cell: ({ row }) => (
      <div className="font-medium">
        {Number(row.getValue("price")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "sortOrder",
    header: "Sort Order",
    cell: ({ row }) => <div>{row.getValue("sortOrder")}</div>,
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <StatusBadge status={row.getValue("state")} />,
  },
  {
    id: "actions",
    header: "",
    enableHiding: false,
    cell: ({ row }) => {
      const tier = row.original;
      return (
        <ActionButtons
          tier={tier}
          onEditClick={onEditClick}
        />
      );
    },
  },
];

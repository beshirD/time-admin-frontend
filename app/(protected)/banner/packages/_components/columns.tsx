"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

import { BannerPackages } from "@/types/entities";

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
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.Inactive}`}>
      {status}
    </span>
  );
};

import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

// Action buttons component
const ActionButtons = ({
  bannerPackages,
}: {
  bannerPackages: BannerPackages;
}) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/banner/packages/${bannerPackages.id}`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="view">View</Button>
      </Link>
      <Link
        href={`/banner/packages/${bannerPackages.id}/edit`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="edit">Edit</Button>
      </Link>
      <DeleteConfirmationDialog
        itemType="bannerPackages"
        itemName={bannerPackages.packageTitle}
        onSuccess={() => {
          window.location.reload();
        }}
        trigger={
          <Button
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            Delete
          </Button>
        }
      />
    </div>
  );
};

export const columns: ColumnDef<BannerPackages>[] = [
  {
    accessorKey: "sNo",
    header: "S.No",
    cell: ({ row }) => <div className="font-medium">{row.getValue("sNo")}</div>,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "packageTitle",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Package Title
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("packageTitle")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Description
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration (Days)",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "maxBanners",
    header: "Max Banners",
    cell: ({ row }) => <div>{row.getValue("maxBanners")}</div>,
  },
  {
    accessorKey: "isPopular",
    header: "Is Popular",
    cell: ({ row }) => <div>{row.getValue("isPopular")}</div>,
  },
  {
    accessorKey: "stateId",
    header: "State Id",
    cell: ({ row }) => <StatusBadge status={row.getValue("stateId")} />,
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created On
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("createdOn")}</div>,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bannerPackages = row.original;
      return <ActionButtons bannerPackages={bannerPackages} />;
    },
  },
];

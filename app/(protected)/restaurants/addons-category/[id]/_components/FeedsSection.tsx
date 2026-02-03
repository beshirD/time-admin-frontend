"use client";

import { Feed } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columns: ColumnDef<Feed>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div className="max-w-md">{row.getValue("content")}</div>
    ),
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
];

interface FeedsSectionProps {
  feeds: Feed[];
}

export function FeedsSection({ feeds }: FeedsSectionProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-5 border space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Feeds
      </h3>
      <DataTable
        columns={columns}
        data={feeds}
        hasPagination={false}
        searchPlaceholder="Search feeds..."
        searchableColumns={["id", "content"]}
      />
    </div>
  );
}

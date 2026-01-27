"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import IconButton from "@/components/ui/IconButton";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { useState } from "react";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

import { Tailor } from "@/types/entities";

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

// Action buttons component
// Action buttons component
const ActionButtons = ({ tailor }: { tailor: Tailor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="dropdown-toggle p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20">
        <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-40 right-0">
        <div className="p-1 flex flex-col gap-0.5">
          <Link
            href={`/users/tailors/${tailor.id}`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4" />
            View
          </Link>
          <Link
            href={`/users/tailors/${tailor.id}/edit`}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <DeleteConfirmationDialog
            itemType="Tailor"
            itemName={tailor.fullName}
            onSuccess={() => {
              window.location.reload();
            }}
            trigger={
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}>
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            }
          />
        </div>
      </Dropdown>
    </div>
  );
};

export const columns: ColumnDef<Tailor>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Full Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email") || "-"}</div>
    ),
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
    cell: ({ row }) => <div>{row.getValue("contactNo")}</div>,
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
    accessorKey: "createdById",
    header: "Created By Id",
    cell: ({ row }) => <div>{row.getValue("createdById")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tailor = row.original;
      return <ActionButtons tailor={tailor} />;
    },
  },
];

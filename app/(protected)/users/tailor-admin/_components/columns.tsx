"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import IconButton from "@/components/ui/IconButton";
import { DeleteTailorAdminDialog } from "./DeleteTailorAdminDialog";

// TailorAdmin type definition
export type TailorAdmin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  stateId: string;
  createdOn: string;
};

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
const ActionButtons = ({ tailorAdmin }: { tailorAdmin: TailorAdmin }) => {
  const fullName = `${tailorAdmin.firstName} ${tailorAdmin.lastName}`;

  return (
    <div className="flex items-center gap-2">
      <Link href={`/users/tailor-admin/${tailorAdmin.id}`}>
        <IconButton
          variant="view"
          title="View">
          <Eye className="h-4 w-4" />
        </IconButton>
      </Link>
      <Link href={`/users/tailor-admin/${tailorAdmin.id}/edit`}>
        <IconButton
          variant="edit"
          title="Edit">
          <Pencil className="h-4 w-4" />
        </IconButton>
      </Link>
      <DeleteTailorAdminDialog
        tailorAdminId={tailorAdmin.id}
        tailorAdminName={fullName}
        onDeleteSuccess={() => {
          // Refresh table data
          window.location.reload();
        }}>
        <IconButton
          variant="delete"
          title="Delete">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </DeleteTailorAdminDialog>
    </div>
  );
};

export const columns: ColumnDef<TailorAdmin>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
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
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tailorAdmin = row.original;
      return <ActionButtons tailorAdmin={tailorAdmin} />;
    },
  },
];

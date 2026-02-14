"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

import { Customer } from "@/types/entities";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    ACTIVE:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    INACTIVE:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    PENDING: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    BANNED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.INACTIVE}`}>
      {status}
    </span>
  );
};

import { DeleteCustomerDialog } from "./DeleteCustomerDialog";

// Action buttons component
const ActionButtons = ({ customer }: { customer: Customer }) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      <Link
        href={`/users/customers/${customer.id}`}
        onClick={(e) => e.stopPropagation()}>
        <Button usage="view">View</Button>
      </Link>

      <DeleteCustomerDialog
        customerId={customer.id}
        customerName={customer.fullName}
        onDeleteSuccess={() => {
          // window.location.reload();
        }}>
        <Button
          usage="delete"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          Delete
        </Button>
      </DeleteCustomerDialog>
    </div>
  );
};

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
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
      const customer = row.original;
      return <ActionButtons customer={customer} />;
    },
  },
];

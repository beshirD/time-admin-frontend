"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Pencil, Trash2 } from "lucide-react";

// Customer type definition
export type Customer = {
  id: number;
  fullName: string;
  email: string;
  contactNo: string;
  stateId: string;
  createdOn: string;
  createdById: string;
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
const ActionButtons = ({ customer }: { customer: Customer }) => {
  const handleView = () => {
    console.log("View customer:", customer.id);
    // Add your view logic here
  };

  const handleEdit = () => {
    console.log("Edit customer:", customer.id);
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log("Delete customer:", customer.id);
    // Add your delete logic here
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleView}
        className="h-8 w-8 flex items-center border justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition text-blue-600 dark:text-blue-400"
        title="View">
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={handleEdit}
        className="h-8 w-8 flex items-center border justify-center hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition text-green-600 dark:text-green-400"
        title="Edit">
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={handleDelete}
        className="h-8 w-8 flex items-center border justify-center hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition text-red-600 dark:text-red-400"
        title="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
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
      const customer = row.original;
      return <ActionButtons customer={customer} />;
    },
  },
];

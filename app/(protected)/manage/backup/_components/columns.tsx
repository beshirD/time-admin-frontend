"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

import { Backup } from "@/types/entities";
import { DeleteBackupDialog } from "./DeleteBackupDialog";

// Action buttons component
const ActionButtons = ({ backup }: { backup: Backup }) => {
  const handleDownload = () => {
    toast.success(`Downloading ${backup.name}`);
  };

  const handleRestore = () => {
    toast.success(`Restoring backup: ${backup.name}`);
  };

  return (
    <div className="flex items-center gap-2 justify-start">
      <Button
        usage="download"
        onClick={(e) => {
          e.stopPropagation();
          handleDownload();
        }}>
        Download
      </Button>

      <Button
        usage="restore"
        onClick={(e) => {
          e.stopPropagation();
          handleRestore();
        }}>
        Restore
      </Button>

      <DeleteBackupDialog
        backupId={backup.id}
        backupName={backup.name}
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
      </DeleteBackupDialog>
    </div>
  );
};

export const columns: ColumnDef<Backup>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-100 transition"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Create Time
          <ArrowUpDown className="h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("createTime")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const backup = row.original;
      return <ActionButtons backup={backup} />;
    },
  },
];

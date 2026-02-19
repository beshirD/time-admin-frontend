import { ColumnDef } from "@tanstack/react-table";
import { UnsubscribeEmail } from "@/types/entities";
import Button from "@/components/ui/Button";
import { UserCheck, UserX } from "lucide-react";

interface ColumnsProps {
  onView: (email: UnsubscribeEmail) => void;
  onEdit: (email: UnsubscribeEmail) => void;
  onDelete: (id: number) => void;
  onToggleSubscription: (email: UnsubscribeEmail) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
  onToggleSubscription,
}: ColumnsProps): ColumnDef<UnsubscribeEmail>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="text-sm">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const state = row.getValue("state") as string;
      const colorClass =
        state === "Active"
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
          {state}
        </span>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdOn"));
      return (
        <div className="text-sm">
          {date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("createdBy")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const email = row.original;
      const isActive = email.state === "Active";
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={(e) => {
              e.stopPropagation();
              onView(email);
            }}>
            View
          </Button>
          <Button
            size="sm"
            usage="edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(email);
            }}>
            Edit
          </Button>
          <Button
            size="sm"
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(email.id);
            }}>
            Delete
          </Button>
          <Button
            size="sm"
            variant={isActive ? "outline" : "default"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSubscription(email);
            }}
            className="gap-2">
            {isActive ? (
              <>
                <UserX className="w-4 h-4" />
                Unsubscribe
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                Subscribe
              </>
            )}
          </Button>
        </div>
      );
    },
  },
];

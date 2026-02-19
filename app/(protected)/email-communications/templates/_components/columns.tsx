import { ColumnDef } from "@tanstack/react-table";
import { EmailTemplate } from "@/types/entities";
import Button from "@/components/ui/Button";

interface ColumnsProps {
  onView: (template: EmailTemplate) => void;
  onEdit: (template: EmailTemplate) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<EmailTemplate>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 dark:text-white">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("title")}
      </div>
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
          : state === "New"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
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
        <div className="text-sm text-gray-600 dark:text-gray-400">
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const template = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={(e) => {
              e.stopPropagation();
              onView(template);
            }}>
            View
          </Button>
          <Button
            size="sm"
            usage="edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(template);
            }}>
            Edit
          </Button>
          <Button
            size="sm"
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(template.id);
            }}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

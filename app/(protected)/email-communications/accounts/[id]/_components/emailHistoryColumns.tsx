import { ColumnDef } from "@tanstack/react-table";
import { EmailCommunication } from "@/types/entities";
import Button from "@/components/ui/Button";

interface ColumnsProps {
  onView: (id: number) => void;
  onEdit: (email: EmailCommunication) => void;
  onDelete: (id: number) => void;
}

export const createEmailHistoryColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<EmailCommunication>[] => [
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
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("subject")}
      </div>
    ),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {row.getValue("to")}
      </div>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const state = row.getValue("state") as string;
      const colorClass =
        state === "Sent"
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : state === "Pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
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
    accessorKey: "sentOn",
    header: "Sent On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("sentOn"));
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
      const email = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={() => onView(email.id)}
          />
          <Button
            size="sm"
            usage="edit"
            onClick={() => onEdit(email)}
          />
          <Button
            size="sm"
            usage="delete"
            onClick={() => onDelete(email.id)}
          />
        </div>
      );
    },
  },
];

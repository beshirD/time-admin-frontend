import { ColumnDef } from "@tanstack/react-table";
import { EmailAccount } from "@/types/entities";
import Button from "@/components/ui/Button";

interface ColumnsProps {
  onView: (id: number) => void;
  onEdit: (account: EmailAccount) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<EmailAccount>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="text-sm ">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium ">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-sm ">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "server",
    header: "Server",
    cell: ({ row }) => <div className="text-sm ">{row.getValue("server")}</div>,
  },
  {
    accessorKey: "port",
    header: "Port",
    cell: ({ row }) => <div className="text-sm ">{row.getValue("port")}</div>,
  },
  {
    accessorKey: "encryption",
    header: "Encryption",
    cell: ({ row }) => (
      <div className="text-sm ">{row.getValue("encryption")}</div>
    ),
  },
  {
    accessorKey: "limitPerEmail",
    header: "Limit Per Email",
    cell: ({ row }) => {
      const limit = row.getValue("limitPerEmail") as number | null;
      return <div className="text-sm ">{limit || ""}</div>;
    },
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="text-sm ">{row.getValue("type")}</div>,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={(e) => {
              e.stopPropagation();
              onView(account.id);
            }}>
            View
          </Button>
          <Button
            size="sm"
            usage="edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account);
            }}>
            Edit
          </Button>
          <Button
            size="sm"
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(account.id);
            }}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

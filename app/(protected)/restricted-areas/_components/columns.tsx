import { ColumnDef } from "@tanstack/react-table";
import { RestrictedArea } from "@/types/entities";
import Button from "@/components/ui/Button";

interface ColumnsProps {
  onView: (area: RestrictedArea) => void;
  onEdit: (area: RestrictedArea) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<RestrictedArea>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "areaName",
    header: "Area Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("areaName")}</div>
    ),
  },
  {
    accessorKey: "startHour",
    header: "Start Hour",
    cell: ({ row }) => (
      <div className="text-sm font-mono">{row.getValue("startHour")}</div>
    ),
  },
  {
    accessorKey: "endHour",
    header: "End Hour",
    cell: ({ row }) => (
      <div className="text-sm font-mono">{row.getValue("endHour")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colorClass =
        status === "active"
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClass}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const area = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={(e) => {
              e.stopPropagation();
              onView(area);
            }}>
            View
          </Button>
          <Button
            size="sm"
            usage="edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(area);
            }}>
            Edit
          </Button>
          <Button
            size="sm"
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(area.id);
            }}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

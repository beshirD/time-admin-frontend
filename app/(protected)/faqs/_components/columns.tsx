import { ColumnDef } from "@tanstack/react-table";
import { FAQ } from "@/types/entities";
import Button from "@/components/ui/Button";

interface ColumnsProps {
  onView: (faq: FAQ) => void;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<FAQ>[] => [
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => (
      <div className="font-medium max-w-md">{row.getValue("question")}</div>
    ),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => {
      const answer = row.getValue("answer") as string;
      const truncated =
        answer.length > 100 ? answer.substring(0, 100) + "..." : answer;
      return <div className="text-sm max-w-lg">{truncated}</div>;
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
          : state === "Inactive"
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
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdOn"));
      return (
        <div className="text-sm">
          {date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
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
      const faq = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            usage="view"
            onClick={(e) => {
              e.stopPropagation();
              onView(faq);
            }}>
            View
          </Button>
          <Button
            size="sm"
            usage="edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(faq);
            }}>
            Edit
          </Button>
          <Button
            size="sm"
            usage="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(faq.id);
            }}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

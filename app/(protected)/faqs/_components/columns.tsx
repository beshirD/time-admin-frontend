import { ColumnDef } from "@tanstack/react-table";
import type { FAQ } from "@/types/entities";
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    id: "question",
    header: "Question",
    accessorFn: (row) => row.translations[0]?.question ?? "—",
    cell: ({ row }) => {
      const question = row.getValue("question") as string;
      return (
        <div
          className="font-medium max-w-xs truncate"
          title={question}>
          {question}
        </div>
      );
    },
  },
  {
    id: "answer",
    header: "Answer",
    accessorFn: (row) => row.translations[0]?.answer ?? "—",
    cell: ({ row }) => {
      const answer = row.getValue("answer") as string;
      const truncated =
        answer.length > 80 ? answer.substring(0, 80) + "..." : answer;
      return (
        <div className="text-sm max-w-sm text-gray-600 dark:text-gray-400">
          {truncated}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-sm capitalize">
        {row.getValue("category") || "—"}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            active
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}>
          {active ? "Active" : "Inactive"}
        </span>
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

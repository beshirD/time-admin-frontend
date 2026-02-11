"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";
import { Order } from "@/types/entities";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

// Status badge component
export const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const statusStyles: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    accepted:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    preparing:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    ready: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
    out_for_delivery:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-red-500 border-red-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
      {status.replace(/_/g, " ").toUpperCase()}
    </span>
  );
};

interface ActionsButtonsProps {
  orderId: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onInvoice?: (id: number) => void;
}

const ActionsButtons = ({
  orderId,
  onView,
  onEdit,
  onDelete,
  onInvoice,
}: ActionsButtonsProps) => {
  return (
    <div className="flex items-center gap-2 justify-start">
      {onInvoice && (
        <Button
          variant="outline"
          size="sm"
          startIcon={<FileText className="w-4 h-4" />}
          className="px-3 py-1.5 text-sm font-medium border-primary border-2 text-primary hover:bg-primary/30 dark:text-primary dark:hover:bg-primary/40 bg-primary/10 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            onInvoice(orderId);
          }}>
          Order Invoices
        </Button>
      )}
      {onView && (
        <Button
          usage="view"
          onClick={(e) => {
            e.stopPropagation();
            onView(orderId);
          }}>
          View
        </Button>
      )}
      {onEdit && (
        <Button
          usage="edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(orderId);
          }}>
          Edit
        </Button>
      )}
      {onDelete && (
        <Button
          usage="delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(orderId);
          }}>
          Delete
        </Button>
      )}
    </div>
  );
};

interface OrdersTableProps {
  data: Order[];
  variant?: "recent" | "all";
  isLoading?: boolean;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onInvoice?: (id: number) => void;
}

export default function OrdersTable({
  data,
  variant = "all",
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onInvoice,
}: OrdersTableProps) {
  const router = useRouter();

  const handleDefaultView = (id: number) => {
    router.push(`/orders/${id}`);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderNo",
      header: "Order No",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {row.original.orderNo}
        </span>
      ),
    },
    {
      accessorKey: "restaurantName",
      header: "Restaurant",
      cell: ({ row }) => (
        <span className="text-gray-900 dark:text-gray-100">
          {row.original.restaurantName}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">🇪🇹</span>
          <span className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate block">
            {row.original.address}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {row.original.totalPrice.toFixed(2)} ETB
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {new Date(row.original.createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => (
        <span className="text-gray-900 dark:text-gray-100">
          {row.original.createdBy}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionsButtons
          orderId={row.original.id}
          // onView={onView || handleDefaultView}
          onEdit={onEdit}
          onDelete={onDelete}
          onInvoice={onInvoice}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      enableSearch={false}
      enableColumnVisibility={false}
      hasPagination={variant === "all"}
      scrollableContainer={variant === "recent"}
      maxHeight={variant === "recent" ? "400px" : undefined}
      stickyHeader={variant === "recent"}
      detailsLink="/orders"
    />
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/DataTable";

export type AdvanceOrder = {
  id: number;
  orderNo: string;
  restaurant: string;
  orderTotal: number;
  paidToRestaurant: number;
  collectedFromCustomer: number;
  cashFlowStatus: "Completed" | "Pending" | "Partial";
  orderDate: string;
  hasCashFlow: boolean;
};

// Status badge component
const StatusBadge = ({
  status,
}: {
  status: AdvanceOrder["cashFlowStatus"];
}) => {
  const statusStyles = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Partial: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const columns: ColumnDef<AdvanceOrder>[] = [
  {
    accessorKey: "orderNo",
    header: "Order #",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {row.original.orderNo}
        </span>
        {row.original.hasCashFlow && (
          <span className="text-xs text-green-600 dark:text-green-400">
            Cash Flow Recorded
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "restaurant",
    header: "Restaurant",
    cell: ({ row }) => (
      <span className="text-gray-900 dark:text-gray-100">
        {row.getValue("restaurant")}
      </span>
    ),
  },
  {
    accessorKey: "orderTotal",
    header: "Order Total",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.getValue<number>("orderTotal").toFixed(2)} ETB
      </span>
    ),
  },
  {
    accessorKey: "paidToRestaurant",
    header: "Paid to Restaurant",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.getValue<number>("paidToRestaurant").toFixed(2)} ETB
      </span>
    ),
  },
  {
    accessorKey: "collectedFromCustomer",
    header: "Collected from Customer",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.getValue<number>("collectedFromCustomer").toFixed(2)} ETB
      </span>
    ),
  },
  {
    accessorKey: "cashFlowStatus",
    header: "Cash Flow Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("cashFlowStatus")} />,
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {row.getValue("orderDate")}
      </span>
    ),
  },
];

interface OrdersTableProps {
  orders: AdvanceOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border text-gray-800 dark:text-white/90 p-5 space-y-4 rounded-lg">
      <h3 className="text-lg font-semibold">Orders for This Advance</h3>
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700/90">
        <DataTable
          columns={columns}
          data={orders}
          searchPlaceholder="Search orders..."
          searchableColumns={["orderNo", "restaurant"]}
          enableSearch={false}
          hasPagination={false}
          enableColumnVisibility={false}
          scrollableContainer={false}
          // maxHeight="400px"
          stickyHeader={true}
        />
      </div>
    </div>
  );
}

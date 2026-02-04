"use client";

import { DataTable } from "@/components/shared/DataTable";
import { Order } from "@/types/entities";
import { ColumnDef } from "@tanstack/react-table";

interface OrdersTableProps {
  columns: ColumnDef<Order>[];
  data: Order[];
}

export default function OrdersTable({ columns, data }: OrdersTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-800">
      <DataTable
        columns={columns}
        data={data}
        enableSearch={false} // We have custom search in filters
        hasPagination={true}
        detailsLink="/orders" // This will redirect to /orders/[id]
      />
    </div>
  );
}

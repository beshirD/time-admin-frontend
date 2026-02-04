"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/entities";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/Button";
import { FileText } from "lucide-react";

export const createColumns = (
  onView: (order: Order) => void,
  onInvoice: (order: Order) => void,
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "orderNo",
    header: "Order No",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.getValue("orderNo")}
      </span>
    ),
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate"
        title={row.getValue("address")}>
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      return <span className="font-medium">{amount.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const status = row.getValue("deliveryStatus") as string;
      let variant: "primary" | "outline" | "destructive" | "default" =
        "default";

      if (status.includes("REJECTED") || status.includes("CANCELLED")) {
        variant = "destructive";
      } else if (status.includes("COMPLETED") || status.includes("DELIVERED")) {
        variant = "primary";
      } else {
        variant = "outline";
      }

      return (
        <Badge
          variant={variant}
          className="capitalize">
          {status.toLowerCase().replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            usage="view"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView(order);
            }}>
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onInvoice(order);
            }}>
            <FileText className="w-4 h-4" />
            Order Invoices
          </Button>
        </div>
      );
    },
  },
];

"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, PrinterIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderDetailHeaderProps {
  orderId: string;
  orderNo: string;
  status: string;
}

export default function OrderDetailHeader({
  orderId,
  orderNo,
  status,
}: OrderDetailHeaderProps) {
  const router = useRouter();

  let variant: "primary" | "outline" | "destructive" | "default" = "default";
  if (status.includes("REJECTED") || status.includes("CANCELLED")) {
    variant = "destructive";
  } else if (status.includes("COMPLETED") || status.includes("DELIVERED")) {
    variant = "primary";
  } else {
    variant = "outline";
  }

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 px-5 py-2 rounded-lg border  md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 transition rounded-full bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order {orderNo}
            </h1>
            <Badge
              variant={variant}
              className="capitalize">
              {status.toLowerCase().replace(/_/g, " ")}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="py-3"
          onClick={() => window.print()}>
          <PrinterIcon className="w-4 h-4 mr-1 border-primary dark:border-primary text-gray-600 dark:text-gray-400" />
          Print Order Invoice
        </Button>
      </div>
    </div>
  );
}

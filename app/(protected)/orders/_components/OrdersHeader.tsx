"use client";

import Button from "@/components/ui/Button";

interface OrdersHeaderProps {
  onAddOrderManual: () => void;
}

export default function OrdersHeader({ onAddOrderManual }: OrdersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Orders
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage and track all restaurant orders.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          usage="create"
          onClick={onAddOrderManual}>
          Add order manually
        </Button>
      </div>
    </div>
  );
}

"use client";

interface OrderSummaryProps {
  totalOrders: number;
  ordersWithCashFlow: number;
  pendingOrders: number;
  completedOrders: number;
}

export default function OrderSummary({
  totalOrders,
  ordersWithCashFlow,
  pendingOrders,
  completedOrders,
}: OrderSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border text-gray-800 dark:text-white/90 p-5 space-y-4 rounded-lg">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalOrders}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Orders with Cash Flow
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {ordersWithCashFlow}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Pending Orders
          </p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pendingOrders}
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Completed Orders
          </p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {completedOrders}
          </p>
        </div>
      </div>
    </div>
  );
}

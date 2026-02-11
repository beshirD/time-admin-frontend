"use client";

import React from "react";
import OrderDetailHeader from "./_components/OrderDetailHeader";
import OrderInfoCard from "./_components/OrderInfoCard";
import CustomerInfoCard from "./_components/CustomerInfoCard";
import OrderLocationMap from "./_components/OrderLocationMap";
import { useOrderDetail } from "@/hooks/useOrderDetail";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { order, isLoading, error } = useOrderDetail(params.id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">
            Error loading order details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <OrderDetailHeader
        orderId={params.id}
        orderNo={order.orderNo}
        status={order.status}
      />

      {/* Order Information Card */}
      <OrderInfoCard order={order} />

      {/* Customer Information Card */}
      <CustomerInfoCard
        customer={{
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          address: order.address,
          city: order.city,
          postalCode: order.postalCode,
        }}
      />

      {/* Location Map */}
      <OrderLocationMap location={order.address} />
    </div>
  );
}

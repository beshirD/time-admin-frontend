import React from "react";
import OrderDetailHeader from "./_components/OrderDetailHeader";
import OrderInfoCard from "./_components/OrderInfoCard";
import CustomerInfoCard from "./_components/CustomerInfoCard";
import OrderLocationMap from "./_components/OrderLocationMap";
import { apiServer } from "@/lib/api-server";
import { OrderDetailResponse } from "@/types/entities";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let orderData: OrderDetailResponse | null = null;
  let error: string | null = null;

  try {
    orderData = await apiServer<OrderDetailResponse>(`/api/admin/orders/${id}`);
  } catch (err) {
    console.error("Failed to fetch order details:", err);
    error = "Error loading order details. Please try again later.";
  }

  if (error || !orderData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">
            {error || "Order not found."}
          </p>
        </div>
      </div>
    );
  }

  const order = orderData.data;

  return (
    <div className="flex flex-col gap-4">
      <OrderDetailHeader
        orderId={id}
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

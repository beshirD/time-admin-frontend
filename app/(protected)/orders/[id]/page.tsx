import React from "react";
import OrderDetailHeader from "./_components/OrderDetailHeader";
import OrderInfoCard from "./_components/OrderInfoCard";
import CustomerInfoCard from "./_components/CustomerInfoCard";
import OrderLocationMap from "./_components/OrderLocationMap";

// Mock order data based on user input
const mockOrderDetail = {
  id: "9175",
  orderNo: "#5802",
  customerName: "Bele Shewa",
  customerPhone: "93 911112222",
  store: "Mus diner",
  address: "XQMQ+9G8, Addis Ababa, Addis Ababa, Ethiopia",
  totalPrice: "AFN 495",
  deliveryCharge: "AFN 30",
  offerDiscount: "AFN 0",
  finalTotal: "AFN 525",
  state: "RESTAURANT_REJECTED",
  paymentStatus: "Paid",
  paymentMode: "Cash on Delivery",
  createdOn: "24-Dec-2025 10:49",
  specialInstructions: "N/A",
  rejectionReason:
    "Auto-rejected: Restaurant did not respond within 20 minutes",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // In real application, fetch the order details by id
  const order = mockOrderDetail;

  return (
    <div className="flex flex-col gap-4">
      <OrderDetailHeader
        orderId={id}
        orderNo={order.orderNo}
        status={order.state}
      />

      {/* Order Information Card */}
      <OrderInfoCard order={order} />

      {/* Customer Information Card */}
      <CustomerInfoCard
        customer={{
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          address: order.address,
        }}
      />

      {/* Location Map */}
      <OrderLocationMap location={order.address} />
    </div>
  );
}

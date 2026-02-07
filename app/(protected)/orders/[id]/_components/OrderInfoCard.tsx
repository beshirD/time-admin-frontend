"use client";

import React from "react";

interface OrderInfo {
  id: string;
  orderNo: string;
  store: string;
  totalPrice: string;
  deliveryCharge: string;
  offerDiscount: string;
  finalTotal: string;
  state: string;
  paymentStatus: string;
  paymentMode: string;
  createdOn: string;
  specialInstructions: string;
  rejectionReason?: string;
}

interface OrderInfoCardProps {
  order: OrderInfo;
}

export default function OrderInfoCard({ order }: OrderInfoCardProps) {
  const details = [
    { label: "ID", value: order.id },
    { label: "Order No", value: order.orderNo },
    { label: "Store", value: order.store },
    { label: "Total Price", value: order.totalPrice },
    { label: "Delivery Charge", value: order.deliveryCharge },
    { label: "Offer Discount", value: order.offerDiscount },
    { label: "Final Total", value: order.finalTotal, highlight: true },
    { label: "State", value: order.state },
    { label: "Payment Status", value: order.paymentStatus },
    { label: "Payment Mode", value: order.paymentMode },
    { label: "Created On", value: order.createdOn },
    {
      label: "Special Instructions",
      value: order.specialInstructions,
      fullWidth: true,
    },
    {
      label: "Rejection/Cancel reason",
      value: order.rejectionReason || "N/A",
      fullWidth: true,
      isError: !!order.rejectionReason,
    },
  ];

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-900">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6 font-primary">
        Order Information
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
        {details.map((item, index) => (
          <div
            key={index}
            className={``}>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
              {item.label}
            </p>
            <p
              className={`text-sm font-medium ${item.highlight ? "text-primary text-lg font-bold" : "text-gray-800 dark:text-white/90"} ${item.isError ? "text-red-500 dark:text-red-400" : ""}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

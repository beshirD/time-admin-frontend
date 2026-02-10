"use client";

import React from "react";

interface Order {
  id: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  store: string;
  address: string;
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

interface OrderDetailCardProps {
  order: Order;
}

export default function OrderDetailCard({ order }: OrderDetailCardProps) {
  const details = [
    { label: "ID", value: order.id },
    { label: "Order No", value: order.orderNo },
    { label: "Customer Name", value: order.customerName },
    { label: "Customer Phone", value: order.customerPhone },
    { label: "Store", value: order.store },
    { label: "Address", value: order.address, fullWidth: true },
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
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6 font-primary">
        Order Information
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
        {details.map((item, index) => (
          <div
            key={index}
            className={`${item.fullWidth ? "md:col-span-2 lg:col-span-3 xl:col-span-4" : ""}`}>
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

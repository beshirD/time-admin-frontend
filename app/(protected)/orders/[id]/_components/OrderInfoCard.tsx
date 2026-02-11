"use client";

import React from "react";
import { OrderDetail } from "@/types/entities";

interface OrderInfoCardProps {
  order: OrderDetail;
}

export default function OrderInfoCard({ order }: OrderInfoCardProps) {
  const details = [
    { label: "ID", value: order.id.toString() },
    { label: "Order No", value: order.orderNo },
    { label: "Restaurant", value: order.restaurantName },
    { label: "Total Price", value: `ETB ${order.totalPrice.toFixed(2)}` },
    { label: "Delivery Fee", value: `ETB ${order.deliveryFee.toFixed(2)}` },
    { label: "Offer Discount", value: `ETB ${order.offerDiscount.toFixed(2)}` },
    {
      label: "Platform Fee",
      value: `ETB ${order.platformFeeAmount.toFixed(2)}`,
    },
    {
      label: "Final Total",
      value: `ETB ${order.finalTotal.toFixed(2)}`,
      highlight: true,
    },
    { label: "Status", value: order.status.replace(/_/g, " ").toUpperCase() },
    { label: "Payment Status", value: order.paymentStatus.toUpperCase() },
    { label: "Payment Method", value: order.paymentMethod.toUpperCase() },
    { label: "Created At", value: new Date(order.createdAt).toLocaleString() },
    { label: "Updated At", value: new Date(order.updatedAt).toLocaleString() },
    {
      label: "Special Instructions",
      value: order.specialInstructions || "N/A",
      fullWidth: true,
    },
    {
      label: "Rejection Reason",
      value: order.rejectionReason || "N/A",
      fullWidth: true,
      isError: !!order.rejectionReason,
    },
    {
      label: "Cancellation Reason",
      value: order.cancellationReason || "N/A",
      fullWidth: true,
      isError: !!order.cancellationReason,
    },
  ];

  // Filter out items with "N/A" values for cleaner display
  const filteredDetails = details.filter((item) => {
    if (item.label === "Rejection Reason" && !order.rejectionReason)
      return false;
    if (item.label === "Cancellation Reason" && !order.cancellationReason)
      return false;
    return true;
  });

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6 font-primary">
        Order Information
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
        {filteredDetails.map((item, index) => (
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

      {/* Order Items Section */}
      {order.items && order.items.length > 0 && (
        <div className="mt-8">
          <h5 className="text-md font-semibold text-gray-800 dark:text-white/90 mb-4">
            Order Items
          </h5>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      Item ID
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {item.itemId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      Quantity
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      Price Each
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      ETB {item.priceEach.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      Subtotal
                    </p>
                    <p className="text-sm font-medium text-primary">{`ETB ${(item.quantity * item.priceEach).toFixed(2)}`}</p>
                  </div>
                </div>
                {item.addons && item.addons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Add-ons
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.addons.map((addon, addonIndex) => (
                        <span
                          key={addonIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          Addon #{addon.addonId} - ETB {addon.price.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

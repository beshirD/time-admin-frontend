"use client";

import React from "react";

interface CustomerInfo {
  customerName: string;
  customerPhone: string;
  address: string;
  city?: string;
  postalCode?: string;
}

interface CustomerInfoCardProps {
  customer: CustomerInfo;
}

export default function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  const details = [
    { label: "Customer Name", value: customer.customerName },
    { label: "Customer Phone", value: customer.customerPhone },
    { label: "Address", value: customer.address, fullWidth: true },
  ];

  // Add optional fields if they exist
  if (customer.city) {
    details.push({ label: "City", value: customer.city });
  }
  if (customer.postalCode) {
    details.push({ label: "Postal Code", value: customer.postalCode });
  }

  return (
    <div className="p-5 border rounded-lg bg-white dark:bg-gray-900">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6 font-primary">
        Customer Information
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {details.map((item, index) => (
          <div
            key={index}
            className={`${(item as any).fullWidth ? "md:col-span-2 lg:col-span-3" : ""}`}>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
              {item.label}
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

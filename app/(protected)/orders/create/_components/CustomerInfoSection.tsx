"use client";

import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

interface CustomerInfoSectionProps {
  data: {
    name: string;
    email: string;
    mobile: string;
  };
  customerId: number | null;
  onCustomerIdChange: (id: number | null) => void;
  onChange: (field: string, value: string) => void;
}

export default function CustomerInfoSection({
  data,
  customerId,
  onCustomerIdChange,
  onChange,
}: CustomerInfoSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Customer Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="customerId">Customer ID *</Label>
          <Input
            id="customerId"
            type="number"
            placeholder="Enter customer ID"
            value={customerId || ""}
            onChange={(e) =>
              onCustomerIdChange(
                e.target.value ? parseInt(e.target.value) : null,
              )
            }
            className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
          />
          <p className="text-xs text-gray-400">
            Enter the existing customer ID from the system
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerName">Name (Display Only)</Label>
          <Input
            id="customerName"
            placeholder="Customer name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email ID (Display Only)</Label>
          <Input
            id="customerEmail"
            placeholder="Customer email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerMobile">Mobile Number (Display Only)</Label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center px-3 border-2 border-gray-100 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-800 text-sm font-medium">
              +251 (ET)
            </div>
            <Input
              id="customerMobile"
              placeholder="Customer mobile"
              value={data.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
              className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Note:</strong> Enter the customer ID to create an order for an
          existing customer. Customer details will be fetched automatically from
          the system.
        </p>
      </div>
    </div>
  );
}

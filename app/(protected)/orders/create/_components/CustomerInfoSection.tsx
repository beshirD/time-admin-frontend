"use client";

import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

interface CustomerInfoSectionProps {
  data: {
    name: string;
    email: string;
    mobile: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function CustomerInfoSection({
  data,
  onChange,
}: CustomerInfoSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Customer Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="customerName">Name</Label>
          <Input
            id="customerName"
            placeholder="Enter customer name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email ID (Optional)</Label>
          <Input
            id="customerEmail"
            placeholder="Enter email ID"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerMobile">Mobile Number</Label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center px-3 border-2 border-gray-100 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-800 text-sm font-medium">
              +93 (AF)
            </div>
            <Input
              id="customerMobile"
              placeholder="Enter mobile number"
              value={data.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
              className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
            />
          </div>
          <p className="text-xs text-gray-400">
            Please enter up to 10 digits without country code
          </p>
        </div>
      </div>
    </div>
  );
}

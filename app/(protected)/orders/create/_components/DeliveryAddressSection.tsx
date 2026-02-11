"use client";

import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

interface DeliveryAddressSectionProps {
  address: string;
  addressId: number | null;
  onAddressIdChange: (id: number | null) => void;
  onChange: (value: string) => void;
}

export default function DeliveryAddressSection({
  address,
  addressId,
  onAddressIdChange,
  onChange,
}: DeliveryAddressSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Delivery Address
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="addressId">Address ID *</Label>
            <Input
              id="addressId"
              type="number"
              placeholder="Enter address ID"
              value={addressId || ""}
              onChange={(e) =>
                onAddressIdChange(
                  e.target.value ? parseInt(e.target.value) : null,
                )
              }
              className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
            />
            <p className="text-xs text-gray-400">
              Enter the customer's saved address ID
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressDisplay">Address (Display Only)</Label>
            <Input
              id="addressDisplay"
              placeholder="Address will be shown here"
              value={address}
              onChange={(e) => onChange(e.target.value)}
              className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
              disabled
            />
          </div>
        </div>

        <div className="w-full mt-4 h-[350px] bg-gray-100 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">📍</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
              Map Integration Coming Soon
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 max-w-sm">
              Order placement and delivery location tracking will be displayed
              here in the next update.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Note:</strong> Enter the address ID from the customer's saved
          addresses. The address details will be fetched automatically.
        </p>
      </div>
    </div>
  );
}

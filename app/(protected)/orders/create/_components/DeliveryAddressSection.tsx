"use client";

import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import OrderLocationMap from "@/app/(protected)/orders/[id]/_components/OrderLocationMap";
import Button from "@/components/ui/Button";

interface DeliveryAddressSectionProps {
  address: string;
  onChange: (value: string) => void;
}

export default function DeliveryAddressSection({
  address,
  onChange,
}: DeliveryAddressSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Delivery Address
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary">
          Use My Location
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Type address or click on map"
          value={address}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 border-2 border-gray-100 focus:border-primary dark:border-gray-800"
        />

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
    </div>
  );
}

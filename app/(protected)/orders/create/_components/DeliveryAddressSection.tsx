"use client";

import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import { useAdminUser } from "@/hooks/useAdminUsers";
import { useMemo, useEffect } from "react";

interface Address {
  id: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  fullAddress?: string;
  [key: string]: unknown; // For any additional fields
}

interface DeliveryAddressSectionProps {
  customerId: number | null;
  addressId: number | null;
  address: string;
  onAddressIdChange: (id: number | null) => void;
  onAddressChange: (address: string) => void;
}

export default function DeliveryAddressSection({
  customerId,
  addressId,
  address,
  onAddressIdChange,
  onAddressChange,
}: DeliveryAddressSectionProps) {
  // Fetch customer details including addresses (for future map integration)
  const { data: customerResponse } = useAdminUser(customerId);

  // Extract addresses from customer data
  const addresses = useMemo(() => {
    if (!customerResponse?.addresses) return [];
    return (customerResponse.addresses || []) as Address[];
  }, [customerResponse]);

  // Get selected address from saved addresses
  const selectedAddress = useMemo(() => {
    if (!addressId || !addresses.length) return null;
    return addresses.find((addr) => addr.id === addressId);
  }, [addressId, addresses]);

  // Auto-fill address when a saved address is selected (for future use)
  useEffect(() => {
    if (selectedAddress) {
      const addressParts = [
        selectedAddress.addressLine1,
        selectedAddress.addressLine2,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.postalCode,
      ].filter(Boolean);

      const fullAddress =
        selectedAddress.fullAddress || addressParts.join(", ");
      if (fullAddress) {
        onAddressChange(fullAddress);
      }
    }
  }, [selectedAddress, onAddressChange]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Delivery Address
        </h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address *</Label>
          <Input
            id="address"
            type="text"
            placeholder="Enter delivery address..."
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-gray-400">
            Enter the full delivery address for this order
          </p>
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
          <strong>Note:</strong> Enter the delivery address manually. Map-based
          address selection will be available in a future update.
        </p>
      </div>
    </div>
  );
}

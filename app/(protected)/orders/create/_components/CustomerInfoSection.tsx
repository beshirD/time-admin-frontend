"use client";

import Label from "@/components/ui/Label";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useMemo } from "react";

interface CustomerInfoSectionProps {
  customerId: number | null;
  onCustomerIdChange: (id: number | null) => void;
  onCustomerDataChange: (data: {
    name: string;
    email: string;
    mobile: string;
  }) => void;
}

export default function CustomerInfoSection({
  customerId,
  onCustomerIdChange,
  onCustomerDataChange,
}: CustomerInfoSectionProps) {
  // Fetch customers (users with USER role)
  const { data: customersData, isLoading } = useAdminUsers({
    roleName: "USER",
    pageSize: 100, // Fetch more for better search experience
    pageNumber: 0,
  });

  // Map customers to searchable select options
  const customerOptions = useMemo(() => {
    if (!customersData?.content) return [];

    return customersData.content.map((user) => ({
      value: user.id.toString(),
      label: user.fullName,
      description: `${user.email} • ${user.contactNo}`,
    }));
  }, [customersData]);

  // Get selected customer data
  const selectedCustomer = useMemo(() => {
    if (!customerId || !customersData?.content) return null;
    return customersData.content.find((user) => user.id === customerId);
  }, [customerId, customersData]);

  // Handle customer selection
  const handleCustomerChange = (value: string) => {
    const selectedId = parseInt(value);
    onCustomerIdChange(selectedId);

    // Find the selected customer and update the form data
    const customer = customersData?.content.find(
      (user) => user.id === selectedId,
    );
    if (customer) {
      onCustomerDataChange({
        name: customer.fullName,
        email: customer.email,
        mobile: customer.contactNo,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Customer Information
      </h3>

      <div className="grid grid-cols-1 gap-5">
        <div className="space-y-2">
          <Label htmlFor="customer">Select Customer *</Label>
          <SearchableSelect
            options={customerOptions}
            value={customerId?.toString() || ""}
            onChange={handleCustomerChange}
            placeholder={
              isLoading ? "Loading customers..." : "Search and select customer"
            }
            searchPlaceholder="Search by name, email, or phone..."
            disabled={isLoading}
          />
          <p className="text-xs text-gray-400">
            Search and select an existing customer from the system
          </p>
        </div>

        {selectedCustomer && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {selectedCustomer.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {selectedCustomer.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                +251 {selectedCustomer.contactNo}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Note:</strong> Select a customer from the dropdown. Their
          details will be automatically populated for the order.
        </p>
      </div>
    </div>
  );
}

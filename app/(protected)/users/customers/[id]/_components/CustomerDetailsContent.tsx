"use client";

import * as React from "react";
import { useAdminUser } from "@/hooks/useAdminUsers";
import { CustomerHeader } from "./CustomerHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";
import { useState } from "react";
import { Tabs } from "./Tabs";
import { AccessTokenTable } from "./AccessTokenTable";
import { AdditionalAddressTable } from "./AdditionalAddressTable";
import { OrdersTable } from "./OrdersTable";

interface CustomerDetailsContentProps {
  customerId: string;
}

export function CustomerDetailsContent({
  customerId,
}: CustomerDetailsContentProps) {
  const {
    data: userDetails,
    isLoading,
    error,
  } = useAdminUser(Number(customerId));
  const [activeTab, setActiveTab] = useState<
    "access-token" | "additional-address" | "orders"
  >("access-token");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading customer details...
        </div>
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load customer details. Please try again.
        </div>
      </div>
    );
  }

  const { user } = userDetails;

  // Transform API data to match the expected format
  const transformedCustomer = {
    id: user.id,
    fullName: user.fullName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    stateId: user.status,
    createdOn: user.createdAt,
    createdById: user.role.name,
    profileImage: null,
    contactNo: user.phoneNumber,
    phoneNumber: user.phoneNumber,
    countryCode: user.countryCode,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    language: user.language,
    timezone: user.timezone,
    status: user.status,
    lastLoginAt: user.lastLoginAt,
    hasActiveSession: user.hasActiveSession,
    role: user.role.name,
  };

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <CustomerHeader
          customerId={customerId}
          fullName={transformedCustomer.fullName}
          status={transformedCustomer.status}
          role={transformedCustomer.role}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={transformedCustomer} />
          <UserInfoCard customer={transformedCustomer} />
          <UserAddressCard />
        </div>

        {/* User Actions Section */}
        <div className="mt-6">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">User Actions</h2>
          </div>

          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {activeTab === "access-token" && <AccessTokenTable />}
            {activeTab === "additional-address" && <AdditionalAddressTable />}
            {activeTab === "orders" && <OrdersTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

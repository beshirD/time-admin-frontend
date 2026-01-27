"use client";

import * as React from "react";
import { useState } from "react";
import { CustomerHeader } from "./_components/CustomerHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";
import { Tabs } from "./_components/Tabs";
import { AccessTokenTable } from "./_components/AccessTokenTable";
import { AdditionalAddressTable } from "./_components/AdditionalAddressTable";
import { OrdersTable } from "./_components/OrdersTable";

// Mock customer data
const mockCustomer = {
  id: 820,
  fullName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  contactNo: "+919876543211",
  stateId: "Active",
  isEmailVerified: true,
  isApprove: false,
  gender: "Male",
  role: "Customer",
  createdOn: "09-Jan-2026 19:47:04 PM",
  createdBy: "Admins",
  profileImage: null,
};

export default function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState<
    "access-token" | "additional-address" | "orders"
  >("access-token");

  const customer = mockCustomer; // In real app, fetch based on id

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg mb-7">
      <div className="mx-auto">
        {/* Header */}
        <CustomerHeader
          customerId={id}
          fullName={customer.fullName}
          status={customer.stateId}
          role={customer.role}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={customer} />
          <UserInfoCard customer={customer} />
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

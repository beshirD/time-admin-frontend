"use client";

import { useState } from "react";
import { CustomerHeader } from "./_components/CustomerHeader";
import { CustomerProfile } from "./_components/CustomerProfile";
import { DetailField } from "./_components/DetailField";
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
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<
    "access-token" | "additional-address" | "orders"
  >("access-token");

  const customer = mockCustomer; // In real app, fetch based on params.id

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <CustomerHeader
          customerId={params.id}
          fullName={customer.fullName}
          status={customer.stateId}
          role={customer.role}
        />

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <CustomerProfile
                fullName={customer.fullName}
                profileImage={customer.profileImage}
              />
            </div>

            {/* Customer Details */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Id"
                    value={customer.id}
                  />
                  <DetailField
                    label="First Name"
                    value={customer.firstName}
                  />
                  <DetailField
                    label="Is Email Verified"
                    value=""
                    badge={{
                      text: customer.isEmailVerified
                        ? "Email verified"
                        : "Not verified",
                      variant: customer.isEmailVerified ? "success" : "error",
                    }}
                  />
                  <DetailField
                    label="Contact No"
                    value={customer.contactNo}
                  />
                  <DetailField
                    label="Role"
                    value={customer.role}
                  />
                  <DetailField
                    label="Created By"
                    value={customer.createdBy}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Email"
                    value={customer.email}
                  />
                  <DetailField
                    label="Last Name"
                    value={customer.lastName}
                  />
                  <DetailField
                    label="Is approve"
                    value=""
                    badge={{
                      text: customer.isApprove ? "Approved" : "Not approve",
                      variant: customer.isApprove ? "success" : "error",
                    }}
                  />
                  <DetailField
                    label="Gender"
                    value={customer.gender}
                  />
                  <DetailField
                    label="Created On"
                    value={customer.createdOn}
                  />
                </div>
              </div>
            </div>
          </div>
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

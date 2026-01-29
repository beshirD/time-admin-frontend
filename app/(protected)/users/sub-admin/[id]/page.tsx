"use client";

import * as React from "react";
import { SubAdminHeader } from "../_components/SubAdminHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";

// Mock sub-admin data
const mockSubAdmin = {
  id: 701,
  fullName: "Yu yu",
  firstName: "Yu",
  lastName: "yu",
  email: "yu@gmail.com",
  stateId: "Active",
  createdOn: "27-Oct-2025 19:23",
  createdById: "Admins",
  profileImage: null,
};

export default function SubAdminDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const subAdmin = mockSubAdmin; // In real app, fetch based on id

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg  ">
      <div className="mx-auto">
        {/* Header */}
        <SubAdminHeader
          subAdminId={id}
          fullName={subAdmin.fullName}
          status={subAdmin.stateId}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={subAdmin} />
          <UserInfoCard customer={subAdmin} />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}

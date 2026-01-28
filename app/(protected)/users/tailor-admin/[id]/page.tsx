"use client";

import * as React from "react";
import { TailorAdminHeader } from "./_components/TailorAdminHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";

// Mock tailor admin data
const mockTailorAdmin = {
  id: 739,
  fullName: "test11 test11",
  firstName: "test11",
  lastName: "test11",
  email: "test11@gmail.com",
  stateId: "Active",
  createdOn: "2025-11-08 17:41:51",
  profileImage: null,
};

export default function TailorAdminDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const tailorAdmin = mockTailorAdmin; // In real app, fetch based on id

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg  ">
      <div className="mx-auto">
        {/* Header */}
        <TailorAdminHeader
          tailorAdminId={id}
          fullName={tailorAdmin.fullName}
          status={tailorAdmin.stateId}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={tailorAdmin} />
          <UserInfoCard customer={tailorAdmin} />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}

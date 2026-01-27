"use client";

import * as React from "react";
import { TailorHeader } from "./_components/TailorHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";

// Mock tailor data
const mockTailor = {
  id: 74,
  fullName: "eyob tariku",
  firstName: "eyob",
  lastName: "tariku",
  email: "",
  contactNo: "+251123456744",
  stateId: "Active",
  createdOn: "29-May-2025 11:54",
  createdById: "Admins",
  profileImage: null,
};

export default function TailorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const tailor = mockTailor; // In real app, fetch based on id

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg mb-7">
      <div className="mx-auto">
        {/* Header */}
        <TailorHeader
          tailorId={id}
          fullName={tailor.fullName}
          status={tailor.stateId}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={tailor} />
          <UserInfoCard customer={tailor} />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}

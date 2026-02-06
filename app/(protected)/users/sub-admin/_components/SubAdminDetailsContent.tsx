"use client";

import * as React from "react";
import { useAdminUser } from "@/hooks/useAdminUsers";
import { SubAdminHeader } from "../_components/SubAdminHeader";
import UserProfileCard from "@/components/shared/UserProfileCard";
import UserInfoCard from "@/components/shared/UserInfoCard";
import UserAddressCard from "@/components/shared/UserAddressCard";

interface SubAdminDetailsContentProps {
  adminId: string;
}

export function SubAdminDetailsContent({
  adminId,
}: SubAdminDetailsContentProps) {
  const { data: userDetails, isLoading, error } = useAdminUser(Number(adminId));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Loading admin details...
        </div>
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load admin details. Please try again.
        </div>
      </div>
    );
  }

  const { user } = userDetails;

  // Transform API data to match the expected format
  const transformedAdmin = {
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
  };

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <SubAdminHeader
          subAdminId={adminId}
          fullName={transformedAdmin.fullName}
          status={transformedAdmin.status}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <UserProfileCard customer={transformedAdmin} />
          <UserInfoCard customer={transformedAdmin} />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
}

"use client";

import { TailorAdminHeader } from "./_components/TailorAdminHeader";
import { TailorAdminProfile } from "./_components/TailorAdminProfile";
import { DetailField } from "./_components/DetailField";

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
  params: { id: string };
}) {
  const tailorAdmin = mockTailorAdmin; // In real app, fetch based on params.id

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <TailorAdminHeader
          tailorAdminId={params.id}
          fullName={tailorAdmin.fullName}
          status={tailorAdmin.stateId}
        />

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <TailorAdminProfile
                fullName={tailorAdmin.fullName}
                profileImage={tailorAdmin.profileImage}
              />
            </div>

            {/* Tailor Admin Details */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Id"
                    value={tailorAdmin.id}
                  />
                  <DetailField
                    label="First Name"
                    value={tailorAdmin.firstName}
                  />
                  <DetailField
                    label="Created On"
                    value={tailorAdmin.createdOn}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Email"
                    value={tailorAdmin.email}
                  />
                  <DetailField
                    label="Last Name"
                    value={tailorAdmin.lastName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

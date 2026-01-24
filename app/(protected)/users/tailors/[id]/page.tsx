"use client";

import { TailorHeader } from "./_components/TailorHeader";
import { TailorProfile } from "./_components/TailorProfile";
import { DetailField } from "./_components/DetailField";

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
  params: { id: string };
}) {
  const tailor = mockTailor; // In real app, fetch based on params.id

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <TailorHeader
          tailorId={params.id}
          fullName={tailor.fullName}
          status={tailor.stateId}
        />

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <TailorProfile
                fullName={tailor.fullName}
                profileImage={tailor.profileImage}
              />
            </div>

            {/* Tailor Details */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Id"
                    value={tailor.id}
                  />
                  <DetailField
                    label="First Name"
                    value={tailor.firstName}
                  />
                  <DetailField
                    label="Contact No"
                    value={tailor.contactNo}
                  />
                  <DetailField
                    label="Created By Id"
                    value={tailor.createdById}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Email"
                    value={tailor.email}
                  />
                  <DetailField
                    label="Last Name"
                    value={tailor.lastName}
                  />
                  <DetailField
                    label="Created On"
                    value={tailor.createdOn}
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

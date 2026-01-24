"use client";

import { SubAdminHeader } from "../_components/SubAdminHeader";
import { SubAdminProfile } from "../_components/SubAdminProfile";
import { DetailField } from "../_components/DetailField";

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
  params: { id: string };
}) {
  const subAdmin = mockSubAdmin; // In real app, fetch based on params.id

  return (
    <div className="p-6 w-full bg-white dark:bg-gray-900 space-y-4 rounded-lg mb-7">
      <div className=" mx-auto">
        {/* Header */}
        <SubAdminHeader
          subAdminId={params.id}
          fullName={subAdmin.fullName}
          status={subAdmin.stateId}
        />

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <SubAdminProfile
                fullName={subAdmin.fullName}
                profileImage={subAdmin.profileImage}
              />
            </div>

            {/* Sub-Admin Details */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Id"
                    value={subAdmin.id}
                  />
                  <DetailField
                    label="First Name"
                    value={subAdmin.firstName}
                  />
                  <DetailField
                    label="Created By Id"
                    value={subAdmin.createdById}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <DetailField
                    label="Email"
                    value={subAdmin.email}
                  />
                  <DetailField
                    label="Last Name"
                    value={subAdmin.lastName}
                  />
                  <DetailField
                    label="Created On"
                    value={subAdmin.createdOn}
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

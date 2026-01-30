import * as React from "react";
import { DriverHeader } from "./_components/DriverHeader";
import DriverInfoCard from "./_components/DriverInfoCard";
import DocumentsTab from "./_components/DocumentsTab";
import RequestedOrdersTab from "./_components/RequestedOrdersTab";
import { Driver } from "@/types/entities";

// Mock data fetcher
async function getDriverData(id: string): Promise<Driver> {
  return {
    id: Number(id),
    fullName: "Ahmed Ashref",
    email: "fayo@gmail.com",
    contactNo: "+251 911005842",
    stateId: "Active",
    createdOn: "29-Oct-2025 22:37:14 PM",
    createdById: "Admins",
    // Detail fields
    firstName: "Tailor",
    lastName: "order",
    riderId: `DRIVER_${id}`,
    isEmailVerified: "Email not verify",
    isApprove: "Approve",
    status: "Offline",
    role: "Driver",
    profilePicture: "/images/demo-user.png", // Empty for now, will show initials
  };
}

export default async function DriverDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const activeTab = tab || "details";
  const driverData = await getDriverData(id);

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "documents":
        return <DocumentsTab />;
      case "requested-orders":
        return <RequestedOrdersTab />;
      case "details":
      default:
        return <DriverInfoCard driverData={driverData} />;
    }
  };

  return (
    <div className="mx-auto ">
      <div className="w-full space-y-5">
        {/* Header with Tabs */}
        <DriverHeader
          driverId={id}
          driverName={driverData.fullName}
          isApprove={driverData.isApprove}
          status={driverData.status || "Offline"}
        />

        {/* Tab Content */}
        <div className="w-full">{renderTabContent()}</div>
        {/* Driver Location Map */}
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-800">
          <h4 className="text-lg font-semibold  mb-2">Driver Location</h4>

          {/* Map Placeholder */}
          <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Map Integration Coming Soon
              </p>
              <p className="text-base text-gray-500 dark:text-gray-500 mt-2">
                Real-time driver location tracking will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      </div>
    </div>
  );
}

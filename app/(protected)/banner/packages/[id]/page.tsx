import * as React from "react";
import BannerPackageHeader from "./_components/BannerPackageHeader";
import BannerPackageInfoCard from "./_components/BannerPackageInfoCard";
import { BannerPackages } from "@/types/entities";
import BannerComments from "../../(main)/[id]/_components/BannerComments";

// Mock data fetcher
async function getPackageData(id: string): Promise<BannerPackages> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: Number(id),
    sNo: 234,
    packageTitle: "Banner Package 1",
    description: "Banner Package 1 Description",
    duration: 4,
    price: 100,
    maxBanners: 10,
    isPopular: true,
    stateId: "Active",
    createdOn: "09-Jan-2026 19:47",
    createdBy: "Admins",
  };
}

export default async function BannerPackageDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const packageData = await getPackageData(id);

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <BannerPackageHeader
          packageId={id}
          packageTitle={packageData.packageTitle}
          status={packageData.stateId}
        />

        {/* Main Content */}
        <div className="space-y-6">
          <BannerPackageInfoCard packageData={packageData} />
        </div>
        <div className="mt-6">
          <BannerComments />
        </div>
      </div>
    </div>
  );
}

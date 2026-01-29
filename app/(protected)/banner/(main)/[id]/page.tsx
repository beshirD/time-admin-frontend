import * as React from "react";
import BannerDetailsHeader from "./_components/BannerDetailsHeader";
import BannerDetailsClient from "./_components/BannerDetailsClient";

// Mock banner data
const mockBanner = {
  id: 4,
  name: "Kabuli palaw",
  restaurant: "Desalech ktfo",
  package: "Premium Banner Package",
  status: "active" as const,
  imageUrl: "/images/demo-banners/banner4.webp",
  subscriptionEndDate: "Oct 9, 2025, 1:42:52 PM",
  subscriptionStatus: "Active",
  createdOn: "Oct 8, 2025, 1:42:52 PM",
  createdBy: "Admins",
};

export default async function BannerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const banner = mockBanner; // In real app, fetch based on id

  return (
    <div className="w-full dark:bg-gray-900 space-y-4 rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <BannerDetailsHeader
          bannerId={id}
          bannerName={banner.name}
          status={banner.status}
        />

        {/* Client Component with all interactive content */}
        <BannerDetailsClient banner={banner} />
      </div>
    </div>
  );
}

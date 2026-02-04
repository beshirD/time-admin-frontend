import * as React from "react";
import { SubscriptionHeader } from "./_components/SubscriptionHeader";
import SubscriptionInfoCard from "./_components/SubscriptionInfoCard";
import QuickStatsCard from "./_components/QuickStatsCard";
import { Subscription } from "@/types/entities";

// Mock data fetcher
async function getSubscriptionData(id: string): Promise<Subscription> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: Number(id),
    restaurant: "Ahlan Gourmet",
    restaurantPhone: "968137410",
    restaurantEmail: "bilal@gmail.com",
    package: "Premium Package - 6 Months",
    packageDetails: "23 days, Max 1 banners",
    startDate: "Jan 29, 2026 19:32",
    endDate: "Feb 21, 2026 16:32",
    duration: "23 days",
    status: "Active (22 days remaining)",
    banners: "0/1 banners",
    bannerUsagePercent: 0.0,
    amount: 121.0,
    paymentMethod: "Admin Direct",
    paymentStatus: "Paid",
    approvalStatus: "Approved",
    created: "Jan 29, 2026 19:32",
    createdBy: "Admins",
  };
}

export default async function SubscriptionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subscriptionData = await getSubscriptionData(id);

  // Extract days left from status
  const daysLeftMatch = subscriptionData.status.match(/(\d+)\s+days/);
  const daysLeft = daysLeftMatch ? parseInt(daysLeftMatch[1]) : 0;

  // Extract banners created from banners string
  const bannersMatch = subscriptionData.banners.match(/(\d+)\/\d+/);
  const bannersCreated = bannersMatch ? parseInt(bannersMatch[1]) : 0;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <SubscriptionHeader
        subscriptionId={id}
        restaurantName={subscriptionData.restaurant}
        status={subscriptionData.status}
      />

      {/* Main Content - 2/3 and 1/3 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - 2/3 */}
        <div className="lg:col-span-2">
          <SubscriptionInfoCard subscriptionData={subscriptionData} />
        </div>

        {/* Right Section - 1/3 */}
        <div className="lg:col-span-1">
          <QuickStatsCard
            daysLeft={daysLeft}
            bannersCreated={bannersCreated}
            totalPaid={subscriptionData.amount}
          />
        </div>
      </div>
    </div>
  );
}

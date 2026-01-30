import * as React from "react";
import { QueueHeader } from "./_components/QueueHeader";
import QueueInfoCard from "./_components/QueueInfoCard";
import AdminActionsCard from "./_components/AdminActionsCard";
import { SubscriptionQueue } from "@/types/entities";

// Mock data fetcher
async function getQueueData(id: string): Promise<SubscriptionQueue> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: Number(id),
    restaurant: "Ahlan Gourmet",
    package: "Premium Package - 6 Months",
    paymentMethod: "Admin Direct",
    amount: 121.0,
    merchant: "Admins",
    merchantEmail: "admin@gmail.com",
    requestedOn: "Jan 29, 2026 16:32",
    paymentProof: "No payment proof uploaded",
    paymentNotes: "No notes provided",
    startDate: "Jan 29, 2026 16:32",
    endDate: "Feb 21, 2026 16:32",
  };
}

export default async function QueueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queueData = await getQueueData(id);

  return (
    <div className="w-full">
      <div className="mx-auto space-y-4">
        {/* Header */}
        <QueueHeader
          queueId={id}
          restaurantName={queueData.restaurant}
        />

        {/* Main Content - 2/3 and 1/3 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - 2/3 */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border rounded-lg">
            <QueueInfoCard queueData={queueData} />
          </div>

          {/* Right Section - 1/3 */}
          <div className="lg:col-span-1">
            <AdminActionsCard
              paymentProof={queueData.paymentProof}
              restaurantName={queueData.restaurant}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

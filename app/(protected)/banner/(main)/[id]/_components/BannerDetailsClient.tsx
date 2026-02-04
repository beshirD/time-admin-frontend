"use client";

import React, { useState } from "react";
import BannerImageCard from "./BannerImageCard";
import BannerInfoCard from "./BannerInfoCard";
import BannerSubscriptionCard from "./BannerSubscriptionCard";
import BannerComments from "./BannerComments";

interface Banner {
  id: number;
  name: string;
  restaurant: string;
  package: string;
  status: "active" | "pending" | "archive";
  imageUrl: string;
  subscriptionEndDate: string;
  subscriptionStatus: string;
  createdOn: string;
  createdBy: string;
}

interface BannerDetailsClientProps {
  banner: Banner;
}

export default function BannerDetailsClient({
  banner,
}: BannerDetailsClientProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <>
      {/* Conditional Layout based on expand state */}
      {isImageExpanded ? (
        // Expanded: Full width image on top, details below
        <div className="space-y-6">
          <BannerImageCard
            imageUrl={banner.imageUrl}
            bannerName={banner.name}
            isExpanded={isImageExpanded}
            onToggleExpand={() => setIsImageExpanded(!isImageExpanded)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BannerInfoCard banner={banner} />
            <BannerSubscriptionCard banner={banner} />
          </div>
        </div>
      ) : (
        // Normal: Two-column layout
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Details */}
          <div className="space-y-8">
            <BannerInfoCard banner={banner} />
            <BannerSubscriptionCard banner={banner} />
          </div>

          {/* Right Column - Banner Image */}
          <div>
            <BannerImageCard
              imageUrl={banner.imageUrl}
              bannerName={banner.name}
              isExpanded={isImageExpanded}
              onToggleExpand={() => setIsImageExpanded(!isImageExpanded)}
            />
          </div>
        </div>
      )}

      {/* Banner Comments Section */}
      <div className="mt-6">
        <BannerComments />
      </div>
    </>
  );
}

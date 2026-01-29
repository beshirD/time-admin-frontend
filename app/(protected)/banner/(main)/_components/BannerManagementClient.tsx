"use client";

import React, { useState } from "react";
import BannerHeader from "./BannerHeader";
import BannerGrid from "./BannerGrid";

interface Banner {
  id: number;
  name: string;
  restaurant: string;
  status: "active" | "pending" | "archive";
  imageUrl: string;
}

interface BannerManagementClientProps {
  initialBanners: Banner[];
}

export default function BannerManagementClient({
  initialBanners,
}: BannerManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter banners based on search query
  const filteredBanners = initialBanners.filter((banner) => {
    const query = searchQuery.toLowerCase();
    return (
      banner.name.toLowerCase().includes(query) ||
      banner.restaurant.toLowerCase().includes(query) ||
      banner.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full space-y-4 mb-7">
      <BannerHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BannerGrid
        banners={initialBanners}
        filteredBanners={filteredBanners}
      />
    </div>
  );
}

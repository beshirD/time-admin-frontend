"use client";

import React, { useState } from "react";
import BannerHeader from "./BannerHeader";
import BannerGrid from "./BannerGrid";
import { useBanners } from "@/hooks/useBanners";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function BannerManagementClient() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch banners from API
  const { banners, isLoading, error } = useBanners();

  // Filter banners based on search query
  const filteredBanners = banners.filter((banner) => {
    const query = searchQuery.toLowerCase();
    return (
      banner.bannerImage.toLowerCase().includes(query) ||
      banner.status.toLowerCase().includes(query) ||
      banner.id.toString().includes(query)
    );
  });

  if (error) {
    return (
      <div className="w-full space-y-4 mb-7">
        <BannerHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-red-600 dark:text-red-400">
            Error loading banners. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 mb-7">
      <BannerHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {isLoading ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border">
          <TableSkeleton
            rows={6}
            columns={1}
            showHeader={false}
          />
        </div>
      ) : (
        <BannerGrid
          banners={banners}
          filteredBanners={filteredBanners}
        />
      )}
    </div>
  );
}

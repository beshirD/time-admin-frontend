"use client";

import React from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerCard from "./BannerCard";

interface Banner {
  id: number;
  name: string;
  restaurant: string;
  status: "active" | "pending" | "archive";
  imageUrl: string;
}

interface BannerGridProps {
  banners: Banner[];
  filteredBanners: Banner[];
}

export default function BannerGrid({
  banners,
  filteredBanners,
}: BannerGridProps) {
  return (
    <>
      {/* Banners Grid */}
      <div className="grid w-full grid-cols-1 bg-white dark:bg-gray-900 p-5 rounded-lg sm:grid-cols-2 lg:grid-cols-3 gap-6 border">
        {filteredBanners.map((banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
          />
        ))}
      </div>

      {/* Empty State (shown when no banners found) */}
      {filteredBanners.length === 0 && banners.length > 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-900 rounded-lg border">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No banners found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search query
          </p>
        </div>
      )}

      {/* Empty State (shown when no banners at all) */}
      {banners.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-900 rounded-lg border">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No banners yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first banner
          </p>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Banner
          </Button>
        </div>
      )}
    </>
  );
}

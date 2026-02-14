"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Banner, BannerStatus } from "@/types/entities";

interface BannerCardProps {
  banner: Banner;
}

const statusConfig: Record<BannerStatus, { label: string; className: string }> =
  {
    active: {
      label: "Active",
      className:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
    },
    pending: {
      label: "Pending",
      className:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-500",
    },
    inactive: {
      label: "Inactive",
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    },
    archive: {
      label: "Archived",
      className:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    },
  };

export default function BannerCard({ banner }: BannerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const statusInfo = statusConfig[banner.status];

  const handleClick = () => {
    router.push(`/banner/${banner.id}`);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/90 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}>
      {/* Banner Image Container with 4:3 aspect ratio */}
      <div className="relative w-full aspect-[8/5] overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={banner.bannerImage}
          alt={`Banner ${banner.id}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        {/* Gradient Overlay with Info - Animated on Hover */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-1/2 flex flex-col justify-end p-4 transition-all duration-500 ease-in-out",
            isHovered
              ? "bg-gradient-to-t from-primary to-transparent opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none",
          )}>
          {" "}
          {/* Banner Info */}
          <div className="transform transition-transform duration-500 ease-out">
            <h3 className="text-white font-semibold text-2xl line-clamp-2 drop-shadow-md">
              Banner #{banner.id}
            </h3>

            <div className="flex items-center justify-between gap-2">
              <p className="text-white/90 text-lg font-medium drop-shadow-md line-clamp-1">
                Restaurant ID: {banner.restaurantId}
              </p>

              <span
                className={cn(
                  "px-2.5 py-1 rounded-full text-base font-semibold whitespace-nowrap shadow-sm",
                  statusInfo.className,
                )}>
                {statusInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge - Always Visible (Top Right) */}
        <div
          className={cn(
            "absolute top-3 right-3 px-2.5 py-1 rounded-full text-base font-semibold shadow-md backdrop-blur-sm transition-opacity duration-300",
            statusInfo.className,
            isHovered ? "opacity-0" : "opacity-100",
          )}>
          {statusInfo.label}
        </div>
      </div>

      {/* Hover Border Effect */}
      <div
        className={cn(
          "absolute inset-0 border-2 border-primary rounded-lg transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

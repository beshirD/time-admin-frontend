import React from "react";
import BannerManagementClient from "./_components/BannerManagementClient";

// Mock data for banners
const mockBanners = [
  {
    id: 1,
    name: "Summer Special Offer",
    restaurant: "Bella Italia",
    status: "active" as const,
    imageUrl: "/images/demo-banners/banner1.png",
  },
  {
    id: 2,
    name: "Weekend Brunch Deal",
    restaurant: "The Breakfast Club",
    status: "pending" as const,
    imageUrl: "/images/demo-banners/banner2.png",
  },
  {
    id: 3,
    name: "Happy Hour Special",
    restaurant: "Ocean View Cafe",
    status: "active" as const,
    imageUrl: "/images/demo-banners/banner3.png",
  },
  {
    id: 4,
    name: "Family Dinner Package",
    restaurant: "Golden Dragon",
    status: "archive" as const,
    imageUrl: "/images/demo-banners/banner4.webp",
  },
  {
    id: 5,
    name: "Lunch Combo Offer",
    restaurant: "Spice Garden",
    status: "active" as const,
    imageUrl: "/images/demo-banners/banner5.jpg",
  },
  {
    id: 6,
    name: "New Year Celebration",
    restaurant: "Royal Palace",
    status: "pending" as const,
    imageUrl: "/images/demo-banners/banner1.png",
  },
];

export default function BannerManagementPage() {
  return <BannerManagementClient initialBanners={mockBanners} />;
}

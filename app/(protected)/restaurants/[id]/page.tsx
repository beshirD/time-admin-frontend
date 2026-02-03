import * as React from "react";
import { RestaurantHeader } from "./_components/RestaurantHeader";
import { RestaurantInfoCard } from "./_components/RestaurantInfoCard";
import { RestaurantLocationMap } from "./_components/RestaurantLocationMap";
import { RestaurantImages } from "./_components/RestaurantImages";
import { RestaurantDetailsSection } from "./_components/RestaurantDetailsSection";

// Mock restaurant data
const mockRestaurant = {
  id: 143,
  merchantId: "Hasdiner",
  email: "hasdiner@gmail.com",
  ownerName: "Has Diner",
  restaurantName: "Has diner",
  deliveryFees: 5.0,
  maxDeliveryDistance: 5,
  platformFeePercentage: 5.0,
  location: "Lafto Sq, Addis Ababa, Addis Ababa",
  averageRating: null,
  state: "Active",
  createdOn: "29-Nov-2025 14:05:44 PM",
  restaurantImage: "/images/demo-banners/banner1.png",
  foodImages: [
    "/images/demo-banners/banner2.png",
    "/images/demo-banners/banner3.png",
    "/images/demo-banners/banner4.webp",
    "/images/demo-banners/banner5.jpg",
  ],
};

export default async function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = mockRestaurant; // In real app, fetch based on id

  return (
    <div className="w-full">
      <div className="mx-auto space-y-5">
        {/* Header */}
        <RestaurantHeader
          restaurantId={id}
          restaurantName={restaurant.restaurantName}
          status={restaurant.state}
        />

        {/* Main Content */}
        <div className="space-y-5">
          <RestaurantInfoCard restaurant={restaurant} />
          <RestaurantLocationMap location={restaurant.location} />
          <RestaurantImages
            restaurantImage={restaurant.restaurantImage}
            foodImages={restaurant.foodImages}
          />
        </div>

        {/* Restaurant Details Section */}
        <RestaurantDetailsSection />
      </div>
    </div>
  );
}

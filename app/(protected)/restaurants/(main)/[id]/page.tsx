"use client";

import { useParams } from "next/navigation";
import { useRestaurantDetails } from "@/hooks/useRestaurantDetails";
import { RestaurantHeader } from "./_components/RestaurantHeader";
import { RestaurantInfoCard } from "./_components/RestaurantInfoCard";
import { RestaurantLocationMap } from "./_components/RestaurantLocationMap";
import { RestaurantImages } from "./_components/RestaurantImages";
import { RestaurantDetailsSection } from "./_components/RestaurantDetailsSection";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function RestaurantDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { restaurant, isLoading, error, updateRestaurant, isUpdating } =
    useRestaurantDetails(id);

  if (isLoading) {
    return (
      <div className="w-full space-y-5 mb-7">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <TableSkeleton
            rows={10}
            columns={2}
            showHeader={false}
          />
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="w-full space-y-5 mb-7">
        <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-error-500">
            Failed to load restaurant details. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto space-y-5">
        {/* Header */}
        <RestaurantHeader
          restaurantId={id}
          restaurantName={restaurant.name}
          status={restaurant.status}
        />

        {/* Main Content */}
        <div className="space-y-5">
          <RestaurantInfoCard
            restaurant={restaurant}
            updateRestaurant={updateRestaurant}
            isUpdating={isUpdating}
          />
          <RestaurantLocationMap location={restaurant.addressLine} />
          <RestaurantImages
            restaurantImage={restaurant.featuredImage}
            foodImages={restaurant.images || []}
          />
        </div>

        {/* Restaurant Details Section */}
        <RestaurantDetailsSection />
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { RestaurantOffer } from "@/types/entities";
import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";
import { useOffers } from "@/hooks/useOffers";
import { useRestaurants } from "@/hooks/useRestaurants";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export function OffersContent() {
  const router = useRouter();
  const { offers, isLoading: offersLoading, error: offersError } = useOffers();
  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants({
    page: 0,
    size: 1000, // Fetch all restaurants for lookup
  });

  // Create restaurant ID to name lookup map
  const restaurantMap = useMemo(() => {
    const map = new Map<number, string>();
    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        map.set(restaurant.id, restaurant.name);
      });
    }
    return map;
  }, [restaurants]);

  const handleView = (offer: RestaurantOffer) => {
    router.push(`/restaurants/offers/${offer.id}`);
  };

  const handleRowClick = (offer: RestaurantOffer) => {
    router.push(`/restaurants/offers/${offer.id}`);
  };

  const columns = createColumns(handleView, restaurantMap);

  if (offersLoading || restaurantsLoading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <PageTitle title="Restaurant Offers" />
          <Button
            onClick={() => router.push("/restaurants/offers/create")}
            usage="create">
            Create Offer
          </Button>
        </div>
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg border">
          <TableSkeleton
            rows={5}
            columns={9}
          />
        </div>
      </div>
    );
  }

  if (offersError) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
          <PageTitle title="Restaurant Offers" />
          <Button
            onClick={() => router.push("/restaurants/offers/create")}
            usage="create">
            Create Offer
          </Button>
        </div>
        <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">
              Failed to load offers. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
        <PageTitle title="Restaurant Offers" />
        <Button
          onClick={() => router.push("/restaurants/offers/create")}
          usage="create">
          Create Offer
        </Button>
      </div>
      <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
        <DataTable
          columns={columns}
          data={offers}
          searchPlaceholder="Search by title, code..."
          searchableColumns={["title", "couponCode"]}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

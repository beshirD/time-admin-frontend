"use client";

import { useParams } from "next/navigation";
import { useOffers } from "@/hooks/useOffers";
import { useRestaurants } from "@/hooks/useRestaurants";
import { OfferDetailsContent } from "./_components/OfferDetailsContent";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import Link from "next/link";

export default function OfferDetailsPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const { offers, isLoading: offersLoading } = useOffers();
  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants({
    page: 0,
    size: 100,
  });

  if (offersLoading || restaurantsLoading) {
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

  const offer = offers.find((o) => o.id === id);
  const restaurant = restaurants?.find((r) => r.id === offer?.restaurantId);

  if (!offer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Offer Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The offer you're looking for doesn't exist.
          </p>
          <Link
            href="/restaurants/offers"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition inline-block">
            Back to Offers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <OfferDetailsContent
        offer={offer}
        restaurantName={
          restaurant?.name || `Restaurant ID: ${offer.restaurantId}`
        }
      />
    </div>
  );
}

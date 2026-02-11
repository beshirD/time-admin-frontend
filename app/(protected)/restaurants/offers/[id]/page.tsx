import { api } from "@/lib/api-client";
import { OffersResponse } from "@/types/entities";
import { OfferDetailsContent } from "./_components/OfferDetailsContent";
import { RestaurantsResponse } from "@/types/entities";
import Link from "next/link";

async function getOfferData(id: string) {
  try {
    // Fetch offers
    const offersResponse = await api.get<OffersResponse>(
      `/api/v1/offers?page=0&size=1000&sortBy=createdAt&direction=DESC&status=active`,
    );

    // Fetch restaurants for name lookup
    const restaurantsResponse = await api.get<RestaurantsResponse>(
      `/api/v1/restaurants?page=0&size=1000&sortBy=id&direction=DESC&status=approved`,
    );

    const offer = offersResponse.content.find((o) => o.id === parseInt(id));
    const restaurant = restaurantsResponse.content.find(
      (r) => r.id === offer?.restaurantId,
    );

    return {
      offer,
      restaurantName: restaurant?.name || "",
    };
  } catch (error) {
    console.error("Error fetching offer:", error);
    return {
      offer: null,
      restaurantName: "",
    };
  }
}

export default async function OfferDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { offer, restaurantName } = await getOfferData(params.id);

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
        restaurantName={restaurantName}
      />
    </div>
  );
}

import { RestaurantOffer } from "@/types/entities";
import { OfferDetailsContent } from "./_components/OfferDetailsContent";

async function getOfferData(id: string): Promise<RestaurantOffer> {
  // Mock data - in real app, fetch from API
  const offers = [
    {
      id: 45,
      title: "For private users",
      code: "PRIVATE2024",
      discountType: "percentage" as const,
      discount: 15,
      minimumAmount: 500,
      endTime: "2026-12-31",
      description:
        "<p>Special offer for private users. Enjoy exclusive discounts!</p>",
      image: "/demo-banner.jpg",
    },
    {
      id: 44,
      title: "Eid special",
      code: "EID2024",
      discountType: "amount" as const,
      discount: 100,
      minimumAmount: 1000,
      endTime: "2026-06-30",
      description:
        "<p>Eid special discount for all orders above minimum amount.</p>",
      image: "/demo-banner.jpg",
    },
    {
      id: 43,
      title: "Eid Ul Fitar",
      code: "EIDFITAR",
      discountType: "percentage" as const,
      discount: 20,
      minimumAmount: 750,
      endTime: "2026-05-15",
      description: "<p>Celebrate Eid Ul Fitar with special discount</p>",
      image: "/demo-banner.jpg",
    },
  ];

  return offers.find((o) => o.id === parseInt(id)) || offers[0];
}

export default async function OfferDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const offer = await getOfferData(params.id);

  return (
    <div suppressHydrationWarning>
      <OfferDetailsContent offer={offer} />
    </div>
  );
}

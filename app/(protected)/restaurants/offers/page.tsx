import { RestaurantOffer } from "@/types/entities";
import { OffersContent } from "./_components/OffersContent";

async function getData(): Promise<RestaurantOffer[]> {
  // Mock data for offers
  return [
    {
      id: 45,
      title: "For private users",
      code: "PRIVATE2024",
      discountType: "percentage",
      discount: 15,
      minimumAmount: 500,
      endTime: "2026-12-31",
      description: "Special offer for private users",
    },
    {
      id: 44,
      title: "Eid special",
      code: "EID2024",
      discountType: "amount",
      discount: 100,
      minimumAmount: 1000,
      endTime: "2026-06-30",
      description: "Eid special discount",
    },
    {
      id: 43,
      title: "Eid Ul Fitar",
      code: "EIDFITAR",
      discountType: "percentage",
      discount: 20,
      minimumAmount: 750,
      endTime: "2026-05-15",
      description: "Celebrate Eid Ul Fitar with special discount",
    },
    {
      id: 42,
      title: "gxdr",
      code: "GXDR2024",
      discountType: "amount",
      discount: 50,
      endTime: "2026-03-31",
      description: "Limited time offer",
    },
  ];
}

export default async function OffersPage() {
  const data = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      <OffersContent initialData={data} />
    </div>
  );
}

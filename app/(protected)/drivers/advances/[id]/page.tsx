import AdvanceDetailsContent from "./_components/AdvanceDetailsContent";
import { getAdvanceData, mockOrders } from "./_components/mockData";

export default async function AdvanceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const advanceData = await getAdvanceData(id);

  return (
    <AdvanceDetailsContent
      advanceData={advanceData}
      orders={mockOrders}
    />
  );
}

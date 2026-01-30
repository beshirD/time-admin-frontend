import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { SubscriptionQueue } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";

async function getData(): Promise<SubscriptionQueue[]> {
  // Mock data for approval queue
  return [
    {
      id: 1,
      restaurant: "Ahlan Gourmet",
      package: "Premium Package - 6 Months",
      paymentMethod: "Admin Direct",
      amount: 121.0,
      merchant: "Admins",
      merchantEmail: "admin@gmail.com",
      requestedOn: "Jan 29, 2026 16:32",
      paymentProof: "No proof uploaded",
      paymentNotes: "No notes provided",
      startDate: "Jan 29, 2026 16:32",
      endDate: "Feb 21, 2026 16:32",
    },
    {
      id: 2,
      restaurant: "Spice Garden",
      package: "Basic Package - 1 Month",
      paymentMethod: "Bank Transfer",
      amount: 50.0,
      merchant: "Restaurant Owner",
      merchantEmail: "owner@spicegarden.com",
      requestedOn: "Jan 28, 2026 14:20",
      paymentProof: "proof_12345.pdf",
      paymentNotes: "Payment made via bank transfer",
      startDate: "Jan 28, 2026 14:20",
      endDate: "Feb 28, 2026 14:20",
    },
    {
      id: 3,
      restaurant: "Ocean Breeze",
      package: "Standard Package - 3 Months",
      paymentMethod: "Credit Card",
      amount: 150.0,
      merchant: "Manager",
      merchantEmail: "manager@oceanbreeze.com",
      requestedOn: "Jan 27, 2026 10:15",
      paymentProof: "receipt_ocean.jpg",
      paymentNotes: "Credit card payment processed",
      startDate: "Jan 27, 2026 10:15",
      endDate: "Apr 27, 2026 10:15",
    },
    {
      id: 4,
      restaurant: "Mountain View Cafe",
      package: "Enterprise Package - 12 Months",
      paymentMethod: "Admin Direct",
      amount: 500.0,
      merchant: "Admins",
      merchantEmail: "admin@gmail.com",
      requestedOn: "Jan 26, 2026 09:00",
      paymentProof: "No proof uploaded",
      paymentNotes: "No notes provided",
      startDate: "Jan 26, 2026 09:00",
      endDate: "Jan 26, 2027 09:00",
    },
    {
      id: 5,
      restaurant: "Urban Kitchen",
      package: "Premium Package - 6 Months",
      paymentMethod: "PayPal",
      amount: 250.0,
      merchant: "Owner",
      merchantEmail: "owner@urbankitchen.com",
      requestedOn: "Jan 25, 2026 16:30",
      paymentProof: "paypal_receipt.pdf",
      paymentNotes: "PayPal transaction completed",
      startDate: "Jan 25, 2026 16:30",
      endDate: "Jul 25, 2026 16:30",
    },
  ];
}

export default async function ApprovalQueuePage() {
  const data = await getData();

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <div className="flex items-center justify-between">
        <PageTitle title="Subscription Approval Queue" />
      </div>

      {/* Approval Queue Table */}
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by restaurant, package, merchant..."
        searchableColumns={["id", "restaurant", "package", "merchant"]}
        detailsLink="/banner/approval-queue"
      />
    </div>
  );
}

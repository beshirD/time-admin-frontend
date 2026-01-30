import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { Subscription } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { CreateSubscriptionDialog } from "./_components/CreateSubscriptionDialog";
import { SubscriptionMetrics } from "./_components/SubscriptionMetrics";

async function getData(): Promise<Subscription[]> {
  // Mock data for subscriptions
  return [
    {
      id: 1,
      restaurant: "Ahlan Gourmet",
      package: "Premium Package - 6 Months",
      startDate: "Jan 29, 2026",
      endDate: "Feb 21, 2026",
      status: "Active (22 days left)",
      banners: "0/1",
      amount: 121.0,
      created: "Jan 29, 2026 19:32",
    },
    {
      id: 2,
      restaurant: "Spice Garden",
      package: "Basic Package - 1 Month",
      startDate: "Jan 15, 2026",
      endDate: "Feb 15, 2026",
      status: "Active (15 days left)",
      banners: "1/1",
      amount: 50.0,
      created: "Jan 15, 2026 10:20",
    },
    {
      id: 3,
      restaurant: "Ocean Breeze",
      package: "Standard Package - 3 Months",
      startDate: "Dec 20, 2025",
      endDate: "Mar 20, 2026",
      status: "Active (49 days left)",
      banners: "2/3",
      amount: 150.0,
      created: "Dec 20, 2025 14:45",
    },
    {
      id: 4,
      restaurant: "Mountain View Cafe",
      package: "Enterprise Package - 12 Months",
      startDate: "Jan 01, 2026",
      endDate: "Jan 01, 2027",
      status: "Active (336 days left)",
      banners: "5/10",
      amount: 500.0,
      created: "Jan 01, 2026 09:00",
    },
    {
      id: 5,
      restaurant: "Urban Kitchen",
      package: "Premium Package - 6 Months",
      startDate: "Nov 10, 2025",
      endDate: "May 10, 2026",
      status: "Active (100 days left)",
      banners: "3/5",
      amount: 250.0,
      created: "Nov 10, 2025 16:30",
    },
    {
      id: 6,
      restaurant: "Sunset Diner",
      package: "Basic Package - 1 Month",
      startDate: "Jan 25, 2026",
      endDate: "Feb 01, 2026",
      status: "Expiring Soon (2 days left)",
      banners: "1/1",
      amount: 50.0,
      created: "Jan 25, 2026 11:15",
    },
    {
      id: 7,
      restaurant: "Green Leaf Bistro",
      package: "Standard Package - 3 Months",
      startDate: "Oct 15, 2025",
      endDate: "Jan 15, 2026",
      status: "Expired",
      banners: "0/3",
      amount: 150.0,
      created: "Oct 15, 2025 13:20",
    },
    {
      id: 8,
      restaurant: "Royal Palace",
      package: "Premium Package - 6 Months",
      startDate: "Sep 01, 2025",
      endDate: "Jan 20, 2026",
      status: "Expired",
      banners: "2/5",
      amount: 250.0,
      created: "Sep 01, 2025 08:45",
    },
    {
      id: 9,
      restaurant: "Fusion Delight",
      package: "Basic Package - 1 Month",
      startDate: "Jan 28, 2026",
      endDate: "Feb 05, 2026",
      status: "Expiring Soon (6 days left)",
      banners: "1/1",
      amount: 50.0,
      created: "Jan 28, 2026 15:00",
    },
    {
      id: 10,
      restaurant: "Taste of Italy",
      package: "Enterprise Package - 12 Months",
      startDate: "Jul 01, 2025",
      endDate: "Jul 01, 2026",
      status: "Active (152 days left)",
      banners: "8/10",
      amount: 500.0,
      created: "Jul 01, 2025 10:30",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="w-full space-y-4 mb-7">
      <div className="flex items-center bg-white dark:bg-gray-900 px-4 py-3 rounded-lg border justify-between">
        <PageTitle title="Subscription Management" />
        <CreateSubscriptionDialog
          title="Create Subscription"
          isExtend={false}
        />
      </div>

      {/* Metrics Cards */}
      <SubscriptionMetrics />

      {/* Subscriptions Table */}
      <div className="flex bg-white dark:bg-gray-900 px-4 py-5 rounded-lg border">
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder="Search by restaurant, package, id..."
          searchableColumns={["id", "restaurant", "package", "status"]}
          detailsLink="/banner/subscriptions"
        />
      </div>
    </div>
  );
}

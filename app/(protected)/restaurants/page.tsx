import PageTitle from "@/components/common/PageTitle";
import { columns } from "./(main)/_components/columns";
import { Restaurant } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
// import { RestaurantsMetrics } from "./(main)/_components/RestaurantsMetrics";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { RestaurantsMetrics } from "./(main)/_components/RestaurantsMetrics";

async function getData(): Promise<Restaurant[]> {
  // Mock data for restaurants
  return [
    {
      id: 143,
      restaurantName: "Has Diner",
      fee: "",
      location: "Lafto Sq, Addis Ababa, Addis Ababa",
      image: "",
      stateId: "Active",
      createdOn: "29-Nov-2025 14:05",
    },
    {
      id: 142,
      restaurantName: "Fahad Restaurant",
      fee: "",
      location: "XQJ4+5VP, Addis Ababa, Ethiopia",
      image: "",
      stateId: "Active",
      createdOn: "19-Nov-2025 14:55",
    },
    {
      id: 141,
      restaurantName: "Green House",
      fee: "",
      location: "WPGG+VGF, Addis Ababa, Addis Ababa, Ethiopia",
      image: "",
      stateId: "Active",
      createdOn: "17-Nov-2025 17:16",
    },
  ];
}

export default async function RestaurantsPage() {
  const data = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      <RestaurantsMetrics />

      {/* Restaurants Table */}
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Restaurants Management" />
          <Link href="/restaurants/create">
            <Button className="gap-2 bg-primary text-white">
              <Plus className="w-4 h-4" />
              Create Restaurant
            </Button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder="Search restaurant by name, location, id..."
          searchableColumns={["id", "restaurantName", "location"]}
          detailsLink="/restaurants"
        />
      </div>
    </div>
  );
}

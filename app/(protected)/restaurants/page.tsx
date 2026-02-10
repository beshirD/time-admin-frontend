import PageTitle from "@/components/common/PageTitle";
import { columns } from "./(main)/_components/columns";
import { Restaurant, RestaurantsResponse } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { RestaurantsMetrics } from "./(main)/_components/RestaurantsMetrics";
import { api } from "@/services/api";

async function getData(): Promise<{
  restaurants: Restaurant[];
  totalCount: number;
}> {
  try {
    const response = await api.get<RestaurantsResponse>("/api/v1/restaurants", {
      params: {
        page: 0,
        size: 20,
        sortBy: "id",
        direction: "DESC",
        status: "approved",
      },
    });

    return {
      restaurants: response.data.content,
      totalCount: response.data.page.totalElements,
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    // Return empty data on error
    return {
      restaurants: [],
      totalCount: 0,
    };
  }
}

export default async function RestaurantsPage() {
  const { restaurants, totalCount } = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      <RestaurantsMetrics
        restaurants={restaurants}
        totalCount={totalCount}
      />

      {/* Restaurants Table */}
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 space-y-4">
        <div className="flex items-center justify-between">
          <PageTitle title="Restaurants Management" />
          <Link href="/restaurants/create">
            <Button usage="create">Create Restaurant</Button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={restaurants}
          searchPlaceholder="Search restaurant by name, cuisine, address..."
          searchableColumns={["name", "cuisine", "addressLine"]}
          detailsLink="/restaurants"
        />
      </div>
    </div>
  );
}

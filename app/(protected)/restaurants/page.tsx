"use client";

import PageTitle from "@/components/common/PageTitle";
import { columns } from "./(main)/_components/columns";
import { DataTable } from "@/components/shared/DataTable";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { RestaurantsMetrics } from "./(main)/_components/RestaurantsMetrics";
import { useRestaurants } from "@/hooks/useRestaurants";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function RestaurantsPage() {
  const {
    data: restaurants,
    totalCount,
    isLoading,
    error,
  } = useRestaurants({
    page: 0,
    size: 20,
    sortBy: "id",
    direction: "DESC",
    status: "approved",
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-5 mb-7">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <TableSkeleton
            rows={10}
            columns={10}
            showHeader={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-5 mb-7">
        <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-error-500">
            Failed to load restaurants. Please try again.
          </div>
        </div>
      </div>
    );
  }

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

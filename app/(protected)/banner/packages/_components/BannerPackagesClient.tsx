"use client";

import { useBannerPackages } from "@/hooks/useBannerPackages";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function BannerPackagesClient() {
  const { packages, isLoading, error } = useBannerPackages();

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
        <p className="text-red-600 dark:text-red-400">
          Error loading banner packages. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border">
        <TableSkeleton
          rows={10}
          columns={10}
          showHeader={true}
        />
      </div>
    );
  }

  // Transform API data to match legacy BannerPackages type for columns
  const transformedData = packages.map((pkg, index) => ({
    sNo: index + 1,
    id: pkg.id,
    packageTitle: pkg.title,
    description: pkg.description,
    duration: pkg.durationDays,
    price: pkg.price,
    maxBanners: pkg.maxBanners,
    isPopular: pkg.isPopular,
    stateId: pkg.status === "active" ? "Active" : "Inactive",
    createdOn: new Date(pkg.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    createdBy: "Admin",
  }));

  return (
    <DataTable
      columns={columns}
      data={transformedData}
      searchPlaceholder="Search by title, description,..."
      searchableColumns={[
        "id",
        "packageTitle",
        "description",
        "duration",
        "price",
        "maxBanners",
        "isPopular",
        "stateId",
        "createdOn",
        "createdBy",
      ]}
      detailsLink="/banner/packages"
    />
  );
}

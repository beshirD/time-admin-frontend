"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import { RestaurantOffer } from "@/types/entities";
import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";

interface OffersContentProps {
  initialData: RestaurantOffer[];
}

export function OffersContent({ initialData }: OffersContentProps) {
  const router = useRouter();

  const handleView = (offer: RestaurantOffer) => {
    router.push(`/restaurants/offers/${offer.id}`);
  };

  const handleRowClick = (offer: RestaurantOffer) => {
    router.push(`/restaurants/offers/${offer.id}`);
  };

  const columns = createColumns(handleView);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
        <PageTitle title="Restaurant Offers" />
        <Button
          onClick={() => router.push("/restaurants/offers/create")}
          usage="create">
          Create Offer
        </Button>
      </div>
      <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg">
        <DataTable
          columns={columns}
          data={initialData}
          searchPlaceholder="Search by title, code..."
          searchableColumns={["title", "code"]}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

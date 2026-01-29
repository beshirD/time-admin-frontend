import PageTitle from "@/components/common/PageTitle";
// import { columns } from "./_components/columns";
import { BannerPackages } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateBannerPackageDialog } from "./_components/CreateBannerPackageDialog";

async function getData(): Promise<BannerPackages[]> {
  // just mock data
  return [
    {
      id: 1,
      sNo: 234,
      packageTitle: "Banner Package 1",
      description: "Banner Package 1 Description",
      duration: 4,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 2,
      sNo: 234,
      packageTitle: "Banner Package 2",
      description: "Banner Package 2 Description",
      duration: 6,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 3,
      sNo: 234,
      packageTitle: "Banner Package 3",
      description: "Banner Package 3 Description",
      duration: 12,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 4,
      sNo: 234,
      packageTitle: "Banner Package 4",
      description: "Banner Package 4 Description",
      duration: 24,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 5,
      sNo: 234,
      packageTitle: "Banner Package 5",
      description: "Banner Package 5 Description",
      duration: 1,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 6,
      sNo: 234,
      packageTitle: "Banner Package 6",
      description: "Banner Package 6 Description",
      duration: 5,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 7,
      sNo: 234,
      packageTitle: "Banner Package 7",
      description: "Banner Package 7 Description",
      duration: 3,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
    {
      id: 8,
      sNo: 234,
      packageTitle: "Banner Package 8",
      description: "Banner Package 8 Description",
      duration: 7,
      price: 100,
      maxBanners: 10,
      isPopular: true,
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdBy: "Admins",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="flex flex-col min-w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <div className="flex items-center justify-between">
        <PageTitle title="Banner Packages" />
        <CreateBannerPackageDialog />
      </div>
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by title, description,..."
        searchableColumns={[
          "id",
          "title",
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
    </div>
  );
}

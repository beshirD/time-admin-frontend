import PageTitle from "@/components/common/PageTitle";
import { CreateBannerPackageDialog } from "./_components/CreateBannerPackageDialog";
import BannerPackagesClient from "./_components/BannerPackagesClient";

export default function BannerPackagesPage() {
  return (
    <div className="flex flex-col min-w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <div className="flex items-center justify-between">
        <PageTitle title="Banner Packages" />
        <CreateBannerPackageDialog />
      </div>
      <BannerPackagesClient />
    </div>
  );
}

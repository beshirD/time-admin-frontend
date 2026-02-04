import { OfferForm } from "../_components/OfferForm";
import PageTitle from "@/components/common/PageTitle";

export default function CreateOfferPage() {
  return (
    <div className="w-full space-y-5 mb-7">
      <div className="flex px-5 py-2 rounded-lg border bg-white dark:bg-gray-900 items-center justify-between">
        <PageTitle title="Create Offer" />
      </div>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
        <OfferForm mode="create" />
      </div>
    </div>
  );
}

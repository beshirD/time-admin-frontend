import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageTitle from "@/components/common/PageTitle";
import { CreateRestaurantForm } from "./_components/CreateRestaurantForm";

export default function CreateRestaurantPage() {
  return (
    <div className="w-full space-y-5 mb-7">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg px-5 py-3 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Link
            href="/restaurants"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <PageTitle title="Create New Restaurant" />
          </div>
        </div>
      </div>

      {/* Form */}
      <CreateRestaurantForm />
    </div>
  );
}

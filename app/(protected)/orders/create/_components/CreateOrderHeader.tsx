"use client";

import PageTitle from "@/components/common/PageTitle";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function CreateOrderHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 px-5 py-4 border rounded-lg gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <PageTitle title="Create Manual Order" />
      </div>
    </div>
  );
}

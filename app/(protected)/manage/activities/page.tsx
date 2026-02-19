"use client";

import PageTitle from "@/components/common/PageTitle";
import { ActivitiesTable } from "./_components/ActivitiesTable";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

export default function ActivitiesPage() {
  const handleClear = () => {
    toast.success("Cleared");
  };

  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg py-4 px-6 justify-between items-center">
        <PageTitle title="Activities Management" />
        <Button
          usage="create"
          onClick={handleClear}>
          Clear Activities
        </Button>
      </div>
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
        <ActivitiesTable />
      </div>
    </div>
  );
}

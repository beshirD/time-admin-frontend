import React from "react";
import { ErrorLogsTable } from "./_components/ErrorLogsTable";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "react-day-picker";
import PageHeader from "./_components/PageHeader";

export default function LoggerPage() {
  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <PageHeader />
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
        <ErrorLogsTable />
      </div>
    </div>
  );
}

import React from "react";
import { LoginHistoryTable } from "./_components/LoginHistoryTable";
import PageHeader from "./_components/PageHeader";

export default function LoginHistoryPage() {
  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <PageHeader />
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4 w-full">
        <LoginHistoryTable />
      </div>
    </div>
  );
}

import PageTitle from "@/components/common/PageTitle";
import TabNavigation from "./_components/TabNavigation";
import DriverAssignmentsClient from "./_components/DriverAssignmentsClient";
import {
  managersData,
  unassignedDriversData,
  assignedDriversData,
} from "./_components/mockData";

interface DriverAssignmentsPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DriverAssignmentsPage({
  searchParams,
}: DriverAssignmentsPageProps) {
  const params = await searchParams;
  const activeTab = params.tab || "assignments";

  return (
    <div className="w-full space-y-5 mb-7">
      {/* Header */}
      <div className="flex bg-white dark:bg-gray-900 rounded-lg border p-5 items-center justify-between">
        <PageTitle title="Driver Assignments" />
        <TabNavigation activeTab={activeTab} />
      </div>

      {/* Client Component with all interactive functionality */}
      <DriverAssignmentsClient
        activeTab={activeTab}
        managersData={managersData}
        unassignedDriversData={unassignedDriversData}
        assignedDriversData={assignedDriversData}
      />
    </div>
  );
}

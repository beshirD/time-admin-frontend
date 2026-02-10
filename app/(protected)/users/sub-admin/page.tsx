import PageTitle from "@/components/common/PageTitle";
import { CreateSubAdminDialog } from "./_components/CreateSubAdminDialog";
import { SubAdminTable } from "./_components/SubAdminTable";

export default function SubAdminPage() {
  return (
    <div className="w-full space-y-5 mb-7">
      <div className="flex bg-white dark:bg-gray-900 p-5 border rounded-lg items-center justify-between">
        <PageTitle title="Sub Admin Management" />
        <CreateSubAdminDialog />
      </div>
      <div className="flex bg-white dark:bg-gray-900 p-5 rounded-lg border">
        <SubAdminTable />
      </div>
    </div>
  );
}

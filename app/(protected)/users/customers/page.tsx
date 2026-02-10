import PageTitle from "@/components/common/PageTitle";
import { CustomersTable } from "./_components/CustomersTable";

export default function CustomersPage() {
  return (
    <div className="flex flex-col min-w-full gap-5 mb-7">
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
        <PageTitle title="Customers Management" />
      </div>
      <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
        <CustomersTable />
      </div>
    </div>
  );
}

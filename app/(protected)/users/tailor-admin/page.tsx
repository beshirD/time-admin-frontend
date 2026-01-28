import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { TailorAdmin } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { CreateTailorAdminDialog } from "./_components/CreateTailorAdminDialog";

async function getData(): Promise<TailorAdmin[]> {
  // Fetch data from your API here.
  return [
    {
      id: 739,
      fullName: "test11 test11",
      email: "test11@gmail.com",
      stateId: "Active",
      createdOn: "2025-11-08 17:41:51",
      createdById: "Admins",
    },
    {
      id: 738,
      fullName: "tailor yusra",
      email: "tailor@gmail.com",
      stateId: "Active",
      createdOn: "2025-11-08 16:51:47",
      createdById: "Admins",
    },
    {
      id: 375,
      fullName: "tailor test",
      email: "tailortest@gmail.com",
      stateId: "Active",
      createdOn: "2025-08-13 18:41:53",
      createdById: "Admins",
    },
    {
      id: 372,
      fullName: "test tailor",
      email: "tailor@gmail.com",
      stateId: "Active",
      createdOn: "2025-08-13 18:04:20",
      createdById: "Admins",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <div className="flex items-center justify-between">
        <PageTitle title="Tailor Admin Management" />
        <CreateTailorAdminDialog />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by name, email, id..."
        searchableColumns={["id", "fullName", "email"]}
        detailsLink="/users/tailor-admin"
      />
    </div>
  );
}

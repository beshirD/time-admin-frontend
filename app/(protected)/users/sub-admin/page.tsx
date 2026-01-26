import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { SubAdmin } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { CreateSubAdminDialog } from "./_components/CreateSubAdminDialog";

async function getData(): Promise<SubAdmin[]> {
  // Fetch data from your API here.
  return [
    {
      id: 701,
      fullName: "Yu yu",
      email: "yu@gmail.com",
      stateId: "Active",
      createdOn: "27-Oct-2025 19:23",
      createdById: "Admins",
    },
    {
      id: 685,
      fullName: "yusra muhaba",
      email: "yusra@gmail.com",
      stateId: "Active",
      createdOn: "23-Oct-2025 17:07",
      createdById: "Admins",
    },
    {
      id: 682,
      fullName: "Shabeer Ahmad",
      email: "Shabirahmadnabizada3@gmail.com",
      stateId: "Active",
      createdOn: "22-Oct-2025 18:12",
      createdById: "Admins",
    },
    {
      id: 574,
      fullName: "delivery test",
      email: "basherahmad@gmail.com",
      stateId: "Active",
      createdOn: "03-Oct-2025 22:52",
      createdById: "Admins",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="w-full dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <div className="flex items-center justify-between">
        <PageTitle title="Sub Admin Management" />
        <CreateSubAdminDialog />
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by name, email, id..."
        searchableColumns={["id", "fullName", "email"]}
      />
    </div>
  );
}

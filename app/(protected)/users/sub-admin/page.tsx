import { columns, SubAdmin } from "./_components/columns";
import { DataTable } from "./_components/data-table";
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
    <div className="container mx-auto py-10">
      {/* Header with Title and Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg w-full">
          <h1 className="text-lg font-semibold">SUB-ADMIN-INDEX</h1>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <CreateSubAdminDialog />
      </div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

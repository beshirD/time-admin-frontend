import { columns, TailorAdmin } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { CreateTailorAdminDialog } from "./_components/CreateTailorAdminDialog";

async function getData(): Promise<TailorAdmin[]> {
  // Fetch data from your API here.
  return [
    {
      id: 739,
      firstName: "test11",
      lastName: "test11",
      email: "test11@gmail.com",
      stateId: "Active",
      createdOn: "2025-11-08 17:41:51",
    },
    {
      id: 738,
      firstName: "tailor",
      lastName: "yusra",
      email: "tailor@gmail.com",
      stateId: "Active",
      createdOn: "2025-11-08 16:51:47",
    },
    {
      id: 375,
      firstName: "tailor",
      lastName: "test",
      email: "tailortest@gmail.com",
      stateId: "Active",
      createdOn: "2025-08-13 18:41:53",
    },
    {
      id: 372,
      firstName: "test",
      lastName: "tailor",
      email: "tailor@gmail.com",
      stateId: "Active",
      createdOn: "2025-08-13 18:04:20",
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
          <h1 className="text-lg font-semibold">Tailor Admin List</h1>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <CreateTailorAdminDialog />
      </div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

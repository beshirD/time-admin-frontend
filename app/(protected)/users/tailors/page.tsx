import { columns, Tailor } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Tailor[]> {
  // Fetch data from your API here.
  return [
    {
      id: 74,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456744",
      stateId: "Active",
      createdOn: "29-May-2025 11:54",
      createdById: "Admins",
    },
    {
      id: 64,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456724",
      stateId: "Active",
      createdOn: "26-May-2025 17:23",
      createdById: "Admins",
    },
    {
      id: 63,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456723",
      stateId: "Active",
      createdOn: "26-May-2025 17:21",
      createdById: "Admins",
    },
    {
      id: 62,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456722",
      stateId: "Active",
      createdOn: "26-May-2025 17:18",
      createdById: "Admins",
    },
    {
      id: 61,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456721",
      stateId: "Active",
      createdOn: "26-May-2025 17:16",
      createdById: "Admins",
    },
    {
      id: 60,
      fullName: "eyob tariku",
      email: "",
      contactNo: "+251123456729",
      stateId: "Active",
      createdOn: "26-May-2025 17:04",
      createdById: "Admins",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { Driver } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";
import { DriversMetrics } from "./_components/DriversMetrics";

async function getData(): Promise<Driver[]> {
  // Mock data for drivers
  return [
    {
      id: 816,
      fullName: "ahmad ustad",
      email: "s11@gmail.com",
      contactNo: "+93790981414",
      stateId: "Active",
      createdOn: "20-Nov-2025 10:52",
      createdById: "Admins",
    },
    {
      id: 815,
      fullName: "ahmad ustad",
      email: "s@gmail.com",
      contactNo: "+93788788780",
      stateId: "Active",
      createdOn: "20-Nov-2025 10:52",
      createdById: "Admins",
    },
    {
      id: 814,
      fullName: "Khan Jan",
      email: "khajan@gmail.com",
      contactNo: "+93711999000",
      stateId: "Active",
      createdOn: "20-Nov-2025 10:52",
      createdById: "Admins",
    },
    {
      id: 775,
      fullName: "Hamdullahy Hamdarda",
      email: "jan262@email.com",
      contactNo: "+93700999775",
      stateId: "Active",
      createdOn: "13-Nov-2025 12:04",
      createdById: "Admins",
    },
    {
      id: 774,
      fullName: "Mohammad Ali",
      email: "mali@gmail.com",
      contactNo: "+93799888777",
      stateId: "Active",
      createdOn: "12-Nov-2025 15:30",
      createdById: "Admins",
    },
    {
      id: 773,
      fullName: "Rashid Khan",
      email: "rashid.k@gmail.com",
      contactNo: "+93788777666",
      stateId: "Inactive",
      createdOn: "10-Nov-2025 09:15",
      createdById: "Admins",
    },
    {
      id: 772,
      fullName: "Bilal Ahmad",
      email: "bilal.ahmad@gmail.com",
      contactNo: "+93777666555",
      stateId: "Active",
      createdOn: "08-Nov-2025 14:20",
      createdById: "Admins",
    },
  ];
}

export default async function DriversPage() {
  const data = await getData();

  return (
    <div className="w-full space-y-5 mb-7">
      {/* <div className="flex flex-col gap-5 bg-white dark:bg-gray-900 rounded-lg px-5 py-3 border"> */}
      {/* <PageTitle title="Drivers Management" /> */}

      {/* </div> */}
      <DriversMetrics />

      {/* Drivers Table */}
      <div className="flex gap-5 bg-white dark:bg-gray-900 rounded-lg p-5 border">
        <DataTable
          columns={columns}
          data={data}
          searchPlaceholder="Search driver by name, email, contact, id..."
          searchableColumns={["id", "fullName", "email", "contactNo"]}
          detailsLink="/drivers"
        />
      </div>
    </div>
  );
}

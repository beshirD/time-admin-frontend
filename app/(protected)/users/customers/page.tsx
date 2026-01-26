import PageTitle from "@/components/common/PageTitle";
import { columns } from "./_components/columns";
import { Customer } from "@/types/entities";
import { DataTable } from "@/components/shared/DataTable";

async function getData(): Promise<Customer[]> {
  // just mock data
  return [
    {
      id: 820,
      fullName: "John Doe",
      email: "john.doe@example.com",
      contactNo: "+919876543211",
      stateId: "Active",
      createdOn: "09-Jan-2026 19:47",
      createdById: "Admins",
    },
    {
      id: 818,
      fullName: "Bele Shewa",
      email: "",
      contactNo: "93911112222",
      stateId: "Active",
      createdOn: "19-Dec-2025 11:09",
      createdById: "Admins",
    },
    {
      id: 813,
      fullName: "m",
      email: "",
      contactNo: "0990909009",
      stateId: "Active",
      createdOn: "19-Nov-2025 13:54",
      createdById: "Admins",
    },
    {
      id: 810,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      contactNo: "+919876543212",
      stateId: "Active",
      createdOn: "15-Nov-2025 10:30",
      createdById: "Admins",
    },
    {
      id: 805,
      fullName: "Michael Chen",
      email: "m.chen@example.com",
      contactNo: "+919876543213",
      stateId: "Active",
      createdOn: "10-Nov-2025 14:22",
      createdById: "Admins",
    },
    {
      id: 798,
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      contactNo: "+919876543214",
      stateId: "Inactive",
      createdOn: "05-Nov-2025 09:15",
      createdById: "Admins",
    },
    {
      id: 792,
      fullName: "Robert Wilson",
      email: "r.wilson@example.com",
      contactNo: "+919876543215",
      stateId: "Active",
      createdOn: "01-Nov-2025 16:45",
      createdById: "Admins",
    },
    {
      id: 785,
      fullName: "Lisa Anderson",
      email: "lisa.a@example.com",
      contactNo: "+919876543216",
      stateId: "Active",
      createdOn: "28-Oct-2025 11:20",
      createdById: "Admins",
    },
    {
      id: 778,
      fullName: "David Martinez",
      email: "d.martinez@example.com",
      contactNo: "+919876543217",
      stateId: "Active",
      createdOn: "25-Oct-2025 13:55",
      createdById: "Admins",
    },
    {
      id: 770,
      fullName: "Jennifer Taylor",
      email: "j.taylor@example.com",
      contactNo: "+919876543218",
      stateId: "Inactive",
      createdOn: "20-Oct-2025 08:30",
      createdById: "Admins",
    },
    {
      id: 765,
      fullName: "James Brown",
      email: "james.b@example.com",
      contactNo: "+919876543219",
      stateId: "Active",
      createdOn: "15-Oct-2025 15:10",
      createdById: "Admins",
    },
    {
      id: 758,
      fullName: "Maria Garcia",
      email: "m.garcia@example.com",
      contactNo: "+919876543220",
      stateId: "Active",
      createdOn: "10-Oct-2025 12:40",
      createdById: "Admins",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 space-y-4 rounded-lg mb-7">
      <PageTitle title="Customers Management" />
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search by name, email, id, contact..."
        searchableColumns={["id", "fullName", "email", "contactNo"]}
      />
    </div>
  );
}

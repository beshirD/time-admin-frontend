import { SimpleTable } from "@/components/shared/SimpleTable";

export function AdditionalAddressTable() {
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Title", accessorKey: "title" },
    { header: "Address", accessorKey: "address" },
    { header: "Pincode", accessorKey: "pincode" },
    { header: "Default Address", accessorKey: "defaultAddress" },
    { header: "Type", accessorKey: "type" },
    { header: "Created On", accessorKey: "createdOn" },
    { header: "Created By", accessorKey: "createdBy" },
    { header: "Actions", cell: () => <span>Actions</span> }, // Placeholder for actions
  ];

  return (
    <SimpleTable
      data={[]} // Pass actual data here when available
      columns={columns}
      emptyMessage="No results found."
    />
  );
}

import { SimpleTable } from "@/components/shared/SimpleTable";

export function OrdersTable() {
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Order No", accessorKey: "orderNo" },
    { header: "Owner Name", accessorKey: "ownerName" },
    { header: "Address", accessorKey: "address" },
    { header: "Total Price", accessorKey: "totalPrice" },
    { header: "State", accessorKey: "state" },
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

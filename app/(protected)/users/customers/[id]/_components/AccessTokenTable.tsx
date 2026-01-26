import { Eye, Pencil, Trash2 } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { DeleteCustomerDialog } from "../../_components/DeleteCustomerDialog";
import { SimpleTable } from "@/components/shared/SimpleTable";

export function AccessTokenTable() {
  const data = [
    {
      id: 12311,
      accessToken: "H4zP7YTTIkJLAz3qwRDCT1Qbl44X",
      deviceToken: "AAAARRRbCCCC",
      deviceType: "ANDROID",
      createdOn: "Jan 6, 2026, 7:47:05 PM",
    },
  ];

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Access Token", accessorKey: "accessToken" },
    { header: "Device Token", accessorKey: "deviceToken" },
    { header: "Device Type", accessorKey: "deviceType" },
    { header: "Created On", accessorKey: "createdOn" },
    {
      header: "Actions",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <IconButton
            variant="view"
            title="View">
            <Eye className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="edit"
            title="Edit">
            <Pencil className="h-4 w-4" />
          </IconButton>
          <DeleteCustomerDialog
            customerId={item.id}
            customerName="Access Token">
            <IconButton
              variant="delete"
              title="Delete">
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </DeleteCustomerDialog>
        </div>
      ),
    },
  ];

  return (
    <>
      <SimpleTable
        data={data}
        columns={columns}
        emptyMessage="No results found."
      />
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Showing 1-1 of 1 item.
      </div>
    </>
  );
}

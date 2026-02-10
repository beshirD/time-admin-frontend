import Button from "@/components/ui/Button";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { SimpleTable } from "@/components/shared/SimpleTable";
import { EditAccessTokenDialog } from "./EditAccessTokenDialog";

type AccessToken = {
  id: number;
  accessToken: string;
  deviceToken: string;
  deviceType: string;
  createdOn: string;
};

export function AccessTokenTable() {
  const data: AccessToken[] = [
    {
      id: 12311,
      accessToken: "H4zP7YTTIkJLAz3qwRDCT1Qbl44X",
      deviceToken: "AAAARRRbCCCC",
      deviceType: "ANDROID",
      createdOn: "Jan 6, 2026, 7:47:05 PM",
    },
  ];

  const columns = [
    { header: "ID", accessorKey: "id" as keyof AccessToken },
    { header: "Access Token", accessorKey: "accessToken" as keyof AccessToken },
    { header: "Device Token", accessorKey: "deviceToken" as keyof AccessToken },
    { header: "Device Type", accessorKey: "deviceType" as keyof AccessToken },
    { header: "Created On", accessorKey: "createdOn" as keyof AccessToken },
    {
      header: "Actions",
      cell: (item: AccessToken) => (
        <div className="flex items-center gap-2">
          <EditAccessTokenDialog tokenData={item} />

          <DeleteConfirmationDialog
            trigger={
              <div onClick={(e) => e.stopPropagation()}>
                <Button usage="delete" />
              </div>
            }
            itemType="Access Token"
            itemName={item.accessToken}
            onConfirm={() => {
              console.log("Deleting access token", item.id);
            }}
          />
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
        renderExpandedRow={() => (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              this is the details of this user actions section
            </p>
          </div>
        )}
      />
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Showing 1-1 of 1 item.
      </div>
    </>
  );
}

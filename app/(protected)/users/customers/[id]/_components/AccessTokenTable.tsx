import { Eye, Pencil, Trash2 } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { DeleteCustomerDialog } from "../../_components/DeleteCustomerDialog";

export function AccessTokenTable() {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-light-100 dark:bg-blue-light-900/20">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Access Token
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Device Token
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Device Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Created On
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                12311
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                H4zP7YTTIkJLAz3qwRDCT1Qbl44X
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                AAAARRRbCCCC
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                ANDROID
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                Jan 6, 2026, 7:47:05 PM
              </td>
              <td className="px-4 py-3">
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
                    customerId={12311}
                    customerName="Access Token">
                    <IconButton
                      variant="delete"
                      title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </DeleteCustomerDialog>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Showing 1-1 of 1 item.
      </div>
    </>
  );
}

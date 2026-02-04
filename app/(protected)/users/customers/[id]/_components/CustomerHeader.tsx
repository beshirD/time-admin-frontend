import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { DeleteCustomerDialog } from "../../_components/DeleteCustomerDialog";

interface CustomerHeaderProps {
  customerId: string;
  fullName: string;
  status: string;
  role: string;
}

export function CustomerHeader({
  customerId,
  fullName,
  status,
  role,
}: CustomerHeaderProps) {
  return (
    <div className="py-3 flex items-center px-5 justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/users/customers"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {fullName}
          </h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400">
            {status}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            {role}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DeleteCustomerDialog
          customerId={customerId}
          customerName={fullName}>
          <Button usage="delete">Delete</Button>
        </DeleteCustomerDialog>
      </div>
    </div>
  );
}

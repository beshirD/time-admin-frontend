"use client";

import { useAdminUsers } from "@/hooks/useAdminUsers";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import type { Customer } from "@/types/entities";
import { TableSkeleton } from "@/components/ui/TableSkeleton";

export function CustomersTable() {
  const {
    data: customersData,
    isLoading,
    error,
  } = useAdminUsers({
    roleName: "USER",
    pageSize: 20,
    pageNumber: 0,
  });

  if (isLoading) {
    return (
      <TableSkeleton
        rows={10}
        columns={6}
        showHeader={true}
      />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load customers. Please try again.
        </div>
      </div>
    );
  }

  // Map AdminUser data to Customer format
  const customers: Customer[] = (customersData?.content || []).map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    contactNo: user.contactNo,
    status: user.status,
    createdOn: user.createdOn,
    createdById: user.createdByName, // Map createdByName to createdById
  }));

  return (
    <DataTable
      columns={columns}
      data={customers}
      searchPlaceholder="Search by name, email, id, contact..."
      searchableColumns={["id", "fullName", "email", "contactNo"]}
      detailsLink="/users/customers"
    />
  );
}

"use client";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { AdminUser } from "@/types/user";
import { SubAdmin } from "@/types/entities";
import { useState } from "react";

function transformToSubAdmin(adminUser: AdminUser): SubAdmin {
  return {
    id: adminUser.id,
    fullName: adminUser.fullName,
    email: adminUser.email,
    status: adminUser.status,
    createdOn: adminUser.createdOn,
    createdById: adminUser.createdByName,
  };
}

export function SubAdminTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useAdminUsers({
    roleName: "ADMIN",
    pageNumber: pageIndex,
    pageSize: pageSize,
  });

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-error-500">
          Failed to load sub-admins. Please try again.
        </div>
      </div>
    );
  }

  const transformedData = data?.content.map(transformToSubAdmin) || [];

  return (
    <DataTable
      columns={columns}
      data={transformedData}
      searchPlaceholder="Search by name, email, id..."
      searchableColumns={["id", "fullName", "email"]}
      detailsLink="/users/sub-admin"
      isLoading={isLoading}
      manualPagination={true}
      pageCount={data?.totalPages || 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalItems={data?.totalElements || 0}
      onPaginationChange={handlePaginationChange}
    />
  );
}

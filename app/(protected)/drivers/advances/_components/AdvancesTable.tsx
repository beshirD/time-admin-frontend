"use client";

import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DriverAdvance } from "@/types/entities";

interface AdvancesTableProps {
  columns: ColumnDef<DriverAdvance>[];
  data: DriverAdvance[];
}

export default function AdvancesTable({ columns, data }: AdvancesTableProps) {
  return (
    <div className="overflow-hidden w-full">
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search advances..."
        searchableColumns={["driverName"]}
        enableSearch={false}
        enableColumnVisibility={false}
        scrollableContainer={false}
        maxHeight="600px"
        stickyHeader={true}
        detailsLink="/drivers/advances"
      />
    </div>
  );
}

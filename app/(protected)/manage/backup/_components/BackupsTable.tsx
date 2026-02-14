"use client";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import type { Backup } from "@/types/entities";

// Mock data based on the provided sample
const mockBackups: Backup[] = [
  {
    id: 1,
    name: "db_backup_2026.02.14_07.33.36.sql.zip",
    size: "12.38 kibibytes",
    createTime: "Feb 14, 2026, 10:33:36 AM",
  },
  {
    id: 2,
    name: "db_backup_2026.02.14_07.33.26.sql.zip",
    size: "12.38 kibibytes",
    createTime: "Feb 14, 2026, 10:33:26 AM",
  },
  {
    id: 3,
    name: "db_backup_2026.02.13_22.51.21.sql.zip",
    size: "12.38 kibibytes",
    createTime: "Feb 14, 2026, 1:51:21 AM",
  },
  {
    id: 4,
    name: "db_backup_2026.02.13_22.49.23.sql.zip",
    size: "9.54 mebibytes",
    createTime: "Feb 14, 2026, 1:51:21 AM",
  },
  {
    id: 5,
    name: "db_backup_2026.02.13_17.28.40.sql.zip",
    size: "9.54 mebibytes",
    createTime: "Feb 13, 2026, 8:30:40 PM",
  },
  {
    id: 6,
    name: "db_backup_2026.02.13_17.28.37.sql.zip",
    size: "12.38 kibibytes",
    createTime: "Feb 13, 2026, 8:28:37 PM",
  },
  {
    id: 7,
    name: "db_backup_2025.11.26_08.16.10.sql.zip",
    size: "9.55 mebibytes",
    createTime: "Nov 26, 2025, 11:18:08 AM",
  },
  {
    id: 8,
    name: "db_backup_2025.11.12_13.59.05.sql.zip",
    size: "12.22 kibibytes",
    createTime: "Nov 12, 2025, 4:59:05 PM",
  },
  {
    id: 9,
    name: "db_backup_2025.11.12_13.58.30.sql.zip",
    size: "12.22 kibibytes",
    createTime: "Nov 12, 2025, 4:58:31 PM",
  },
  {
    id: 10,
    name: "db_backup_2025.11.12_13.56.42.sql.zip",
    size: "9.26 mebibytes",
    createTime: "Nov 12, 2025, 4:58:30 PM",
  },
];

export function BackupsTable() {
  return (
    <DataTable
      columns={columns}
      data={mockBackups}
      searchPlaceholder="Search by name, size..."
      searchableColumns={["name", "size", "createTime"]}
    />
  );
}

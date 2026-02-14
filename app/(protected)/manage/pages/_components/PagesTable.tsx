"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createColumns } from "./columns";
import type { Page } from "@/types/entities";
import { PageDetailDialog } from "./PageDetailDialog";
import { CreatePageDialog } from "./CreatePageDialog";
import { EditPageDialog } from "./EditPageDialog";

// Mock data based on the provided sample
const mockPages: Page[] = [
  {
    id: 5,
    title: "help page",
    description:
      "<p>We value your privacy. Your personal info (name, phone, address) is used only to process and deliver your orders. We never sell your data. All transactions are securely encrypted. Contact us for any privacy concerns.</p>",
    state: "Active",
    type: "Refund Policy",
    createdOn: "13-Jun-2025 05:37:45 AM",
  },
  {
    id: 4,
    title: "about us",
    description:
      "<p>We are a leading food delivery service committed to bringing delicious meals from your favorite restaurants right to your doorstep.</p>",
    state: "Active",
    type: "About Us",
    createdOn: "13-Jun-2025 05:23:19 AM",
  },
  {
    id: 3,
    title: "privacy policy",
    description:
      "<p>We value your privacy. Your personal info (name, phone, address) is used only to process and deliver your orders. We never sell your data. All transactions are securely encrypted. Contact us for any privacy concerns.</p>",
    state: "Active",
    type: "Privacy",
    createdOn: "13-Jun-2025 05:22:43 AM",
  },
  {
    id: 2,
    title: "terms and condition",
    description:
      "<p>By using our service, you agree to these terms and conditions. Please read them carefully before placing an order.</p>",
    state: "Active",
    type: "Term & Conditions",
    createdOn: "13-Jun-2025 05:22:06 AM",
  },
];

interface PagesTableProps {
  onCreateClick: () => void;
}

export function PagesTable({ onCreateClick }: PagesTableProps) {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleViewClick = (page: Page) => {
    setSelectedPage(page);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (page: Page) => {
    setSelectedPage(page);
    setIsEditDialogOpen(true);
  };

  const handleRowClick = (page: Page) => {
    setSelectedPage(page);
    setIsDetailDialogOpen(true);
  };

  const columns = createColumns(handleViewClick, handleEditClick);

  return (
    <>
      <DataTable
        columns={columns}
        data={mockPages}
        searchPlaceholder="Search by title, type, ID..."
        searchableColumns={["id", "title", "type", "state"]}
        onRowClick={handleRowClick}
      />

      <PageDetailDialog
        page={selectedPage}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      <EditPageDialog
        page={selectedPage}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import PageTitle from "@/components/common/PageTitle";
import { PagesTable } from "./_components/PagesTable";
import { CreatePageDialog } from "./_components/CreatePageDialog";
import Button from "@/components/ui/Button";

export default function PagesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-w-full gap-5 mb-7">
        <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4 justify-between items-center">
          <PageTitle title="Pages Management" />
          <Button
            usage="create"
            onClick={() => setIsCreateDialogOpen(true)}>
            Create Page
          </Button>
        </div>
        <div className="flex bg-white border dark:bg-gray-900 rounded-lg p-4">
          <PagesTable onCreateClick={() => setIsCreateDialogOpen(true)} />
        </div>
      </div>

      <CreatePageDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </>
  );
}

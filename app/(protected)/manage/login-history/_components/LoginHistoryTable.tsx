"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createLoginHistoryColumns } from "./loginHistoryColumns";
import type { LoginHistory } from "@/types/entities";
import { LoginHistoryDetailDialog } from "./LoginHistoryDetailDialog";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PageTitle from "@/components/common/PageTitle";

// Mock data based on the provided sample
const mockLoginHistories: LoginHistory[] = [
  {
    id: 12601,
    userIp: "31.14.252.10",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 9, 2026, 8:45:37 PM",
    user: "Nayf Nayf",
    userId: 825,
  },
  {
    id: 12600,
    userIp: "31.14.252.10",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 9, 2026, 8:27:46 PM",
    user: "Nayf Nayf",
    userId: 825,
  },
  {
    id: 12599,
    userIp: "31.14.252.10",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 9, 2026, 1:23:15 PM",
    user: "Nayf Nayf",
    userId: 825,
  },
  {
    id: 12598,
    userIp: "31.14.252.10",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 9, 2026, 1:22:57 PM",
    user: "Nayf Nayf",
    userId: 825,
  },
  {
    id: 12597,
    userIp: "89.33.8.62",
    userAgent:
      "Development/FoodApp_Customer/1.1.5 (SM-S928B / Android version:16)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 6, 2026, 4:59:21 PM",
    user: "Customer User",
    userId: 456,
  },
  {
    id: 12596,
    userIp: "31.14.252.9",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 4, 2026, 5:58:30 PM",
    user: "Admin User",
    userId: 123,
  },
  {
    id: 12595,
    userIp: "31.14.252.9",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 4, 2026, 5:45:56 PM",
    user: "Admin User",
    userId: 123,
  },
  {
    id: 12594,
    userIp: "169.150.218.23",
    userAgent: "Dart/3.9 (dart:io)",
    state: "Success",
    type: "Web",
    code: "",
    createTime: "Feb 3, 2026, 9:19:56 PM",
    user: "Test User",
    userId: 789,
  },
];

export function LoginHistoryTable() {
  const [selectedHistory, setSelectedHistory] = useState<LoginHistory | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleViewClick = (history: LoginHistory) => {
    setSelectedHistory(history);
    setIsDetailDialogOpen(true);
  };

  const handleRowClick = (history: LoginHistory) => {
    setSelectedHistory(history);
    setIsDetailDialogOpen(true);
  };

  const handleClearHistories = () => {
    toast.success("All login histories cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createLoginHistoryColumns(handleViewClick);

  return (
    <>
      <div className="space-y-4 w-full">
        {/* Header with Clear Button */}

        {/* Table */}
        <DataTable
          columns={columns}
          data={mockLoginHistories}
          searchPlaceholder="Search by ID, IP, user agent, type..."
          searchableColumns={["id", "userIp", "userAgent", "type"]}
          onRowClick={handleRowClick}
        />
      </div>

      <LoginHistoryDetailDialog
        history={selectedHistory}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      {/* Clear Histories Confirmation Dialog */}
      <AlertDialog
        open={isClearDialogOpen}
        onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              login history records from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleClearHistories}>
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

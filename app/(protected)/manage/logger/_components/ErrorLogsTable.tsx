"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { createErrorLogColumns } from "./errorLogColumns";
import type { ErrorLog } from "@/types/entities";
import { ErrorLogDetailDialog } from "./ErrorLogDetailDialog";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import PageTitle from "@/components/common/PageTitle";

// Mock data based on the provided sample
const mockErrorLogs: ErrorLog[] = [
  {
    id: 33475,
    error: "0: Login Required",
    state: "Active",
    link: "https://time.solviatechnology.com/api/cart-item/driver-location?lat=9.0413949&long=38.6986501&address=2MRX%2BGGM%2C+Addis+Ababa%2C+Addis+Ababa",
    type: "API",
    userIp: "31.14.252.10",
    user: "Admins",
    createdOn: "Feb 9, 2026, 8:45:53 PM",
    url: "https://time.solviatechnology.com/api/cart-item/driver-location?lat=9.0413949&long=38.6986501&address=2MRX%2BGGM%2C+Addis+Ababa%2C+Addis+Ababa",
    refererLink: "",
    userAgent: "Dart/3.9 (dart:io)",
    stackTrace: `---------------------
#0 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/filters/AccessControl.php(156): yii\\web\\User->loginRequired()
#1 /home/solviaqv/time.solviatechnology.com/protected/components/filters/AccessControl.php(58): yii\\filters\\AccessControl->denyAccess()
#2 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/ActionFilter.php(77): app\\components\\filters\\AccessControl->beforeAction()
#3 [internal function]: yii\\base\\ActionFilter->beforeFilter()
#4 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/Component.php(645): call_user_func()
#5 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/Controller.php(297): yii\\base\\Component->trigger()
#6 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/web/Controller.php(219): yii\\base\\Controller->beforeAction()
#7 /home/solviaqv/time.solviatechnology.com/protected/modules/api/components/ApiBaseController.php(96): yii\\web\\Controller->beforeAction()
#8 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/Controller.php(176): app\\modules\\api\\components\\ApiBaseController->beforeAction()
#9 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/Module.php(552): yii\\base\\Controller->runAction()
#10 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/web/Application.php(103): yii\\base\\Module->runAction()
#11 /home/solviaqv/time.solviatechnology.com/vendor/yiisoft/yii2/base/Application.php(384): yii\\web\\Application->handleRequest()
#12 /home/solviaqv/time.solviatechnology.com/index.php(13): yii\\base\\Application->run()
#13 {main}`,
  },
  {
    id: 33474,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/user/check",
    type: "API",
    userIp: "190.2.149.63",
    user: "Admins",
    createdOn: "Feb 6, 2026, 11:43:19 AM",
  },
  {
    id: 33473,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/user/check",
    type: "API",
    userIp: "190.2.149.20",
    user: "Admins",
    createdOn: "Feb 6, 2026, 11:23:44 AM",
  },
  {
    id: 33472,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/cart-item/driver-location?lat=9.0420574&long=38.6990082&address=2MRX%2BXFM%2C+Addis+Ababa%2C+Addis+Ababa",
    type: "API",
    userIp: "80.79.7.203",
    user: "Admins",
    createdOn: "Feb 6, 2026, 11:15:19 AM",
  },
  {
    id: 33471,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/state/get-driver-advance-summary",
    type: "API",
    userIp: "80.79.7.203",
    user: "Admins",
    createdOn: "Feb 6, 2026, 11:15:07 AM",
  },
  {
    id: 33470,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/user/check",
    type: "API",
    userIp: "80.79.7.203",
    user: "Admins",
    createdOn: "Feb 6, 2026, 11:15:07 AM",
  },
  {
    id: 33469,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/user/logout",
    type: "API",
    userIp: "31.14.252.9",
    user: "Admins",
    createdOn: "Feb 4, 2026, 5:57:17 PM",
  },
  {
    id: 33468,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/user/check",
    type: "API",
    userIp: "31.14.252.9",
    user: "Admins",
    createdOn: "Feb 4, 2026, 3:22:13 PM",
  },
  {
    id: 33467,
    error: "0: Your request was made with invalid credentials.",
    state: "Active",
    link: "https://time.solviatechnology.com/api/cart-item/driver-location?lat=9.0412557&long=38.6989401&address=2MRX%2BFH7%2C+Addis+Ababa%2C+Addis+Ababa",
    type: "API",
    userIp: "31.14.252.9",
    user: "Admins",
    createdOn: "Feb 4, 2026, 3:22:10 PM",
  },
];

export function ErrorLogsTable() {
  const [selectedErrorLog, setSelectedErrorLog] = useState<ErrorLog | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const handleViewClick = (errorLog: ErrorLog) => {
    setSelectedErrorLog(errorLog);
    setIsDetailDialogOpen(true);
  };

  const handleRowClick = (errorLog: ErrorLog) => {
    setSelectedErrorLog(errorLog);
    setIsDetailDialogOpen(true);
  };

  const handleClearLogs = () => {
    toast.success("All error logs cleared successfully");
    setIsClearDialogOpen(false);
  };

  const columns = createErrorLogColumns(handleViewClick);

  return (
    <>
      <div className="space-y-4">
        {/* Table */}
        <DataTable
          columns={columns}
          data={mockErrorLogs}
          searchPlaceholder="Search by ID, error, type, user IP..."
          searchableColumns={["id", "error", "type", "userIp", "user"]}
          onRowClick={handleRowClick}
        />
      </div>

      <ErrorLogDetailDialog
        errorLog={selectedErrorLog}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />
    </>
  );
}

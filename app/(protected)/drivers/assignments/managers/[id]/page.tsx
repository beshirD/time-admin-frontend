import React from "react";
import { notFound } from "next/navigation";
import ManagerMetrics from "./_components/ManagerMetrics";
import ManagerDetailsClient from "./_components/ManagerDetailsClient";
import {
  getManagerById,
  getManagerDrivers,
  getManagerMetrics,
  managersData,
} from "../../_components/mockData";
import { Mail } from "lucide-react";

interface ManagerDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ManagerDetailsPage({
  params,
}: ManagerDetailsPageProps) {
  const { id } = await params;
  const managerId = parseInt(id);

  if (isNaN(managerId)) {
    notFound();
  }

  const manager = getManagerById(managerId);

  if (!manager) {
    notFound();
  }

  const assignedDrivers = getManagerDrivers(managerId);
  const metrics = getManagerMetrics(managerId);

  // Get initials for avatar fallback
  const initials = manager.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full space-y-6">
      {/* Manager Header */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
            {manager.profilePicture ? (
              <img
                src={manager.profilePicture}
                alt={manager.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xl">
                {initials}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {manager.fullName}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{manager.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      {/* <ManagerMetrics metrics={metrics} /> */}

      {/* Assigned Drivers Table with Actions */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border">
        <ManagerDetailsClient
          assignedDrivers={assignedDrivers}
          allManagers={managersData}
          managerId={managerId}
        />
      </div>
    </div>
  );
}

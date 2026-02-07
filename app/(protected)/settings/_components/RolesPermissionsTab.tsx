"use client";

import { useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import { usePermissions } from "@/hooks/usePermissions";
import { CreateRoleDialog } from "./CreateRoleDialog";
import { CreatePermissionDialog } from "./CreatePermissionDialog";
import { Loader2, Shield, Key } from "lucide-react";

export function RolesPermissionsTab() {
  const [activeView, setActiveView] = useState<"roles" | "permissions">(
    "roles",
  );

  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Roles & Permissions
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage roles and permissions for access control
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
        <button
          onClick={() => setActiveView("roles")}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
            activeView === "roles"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}>
          <Shield className="inline-block h-4 w-4 mr-2" />
          Roles
        </button>
        <button
          onClick={() => setActiveView("permissions")}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
            activeView === "permissions"
              ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}>
          <Key className="inline-block h-4 w-4 mr-2" />
          Permissions
        </button>
      </div>

      {/* Roles View */}
      {activeView === "roles" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {roles?.length || 0} role{roles?.length !== 1 ? "s" : ""}{" "}
              available
            </p>
            <CreateRoleDialog />
          </div>

          {isLoadingRoles ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : roles && roles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {role.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {role.description}
                      </p>
                    </div>
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Permissions
                      </span>
                      <span className="font-semibold text-primary">
                        {role.permissionCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <Shield className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No roles found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Create your first role to get started
              </p>
            </div>
          )}
        </div>
      )}

      {/* Permissions View */}
      {activeView === "permissions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {permissions?.length || 0} permission
              {permissions?.length !== 1 ? "s" : ""} available
            </p>
            <CreatePermissionDialog />
          </div>

          {isLoadingPermissions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : permissions && permissions.length > 0 ? (
            <div className="space-y-4">
              {/* Group by category */}
              {Object.entries(
                permissions.reduce(
                  (acc, permission) => {
                    const category = permission.category || "Other";
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(permission);
                    return acc;
                  },
                  {} as Record<string, typeof permissions>,
                ),
              ).map(([category, categoryPermissions]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3 px-1">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryPermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 dark:text-white">
                              {permission.name}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                              {permission.code}
                            </p>
                            {permission.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {permission.description}
                              </p>
                            )}
                          </div>
                          <Key className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <Key className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No permissions found
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Create your first permission to get started
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

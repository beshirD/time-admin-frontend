"use client";

import { useState, useMemo } from "react";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import type { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useRoles } from "@/hooks/useRoles";
import { useAssignRole } from "@/hooks/useAssignRole";
import { Loader2 } from "lucide-react";

export function CreateSubAdminDialog() {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleName, setSelectedRoleName] = useState("");

  // Fetch users with roleName=USER
  const { data: usersData, isLoading: isLoadingUsers } = useAdminUsers({
    roleName: "USER",
    pageNumber: 0,
    pageSize: 1000, // Get all users for the dropdown
  });

  // Fetch available roles
  const { data: roles, isLoading: isLoadingRoles } = useRoles();

  // Assign role mutation
  const assignRoleMutation = useAssignRole();

  // Transform users to SearchableSelect options
  const userOptions: SearchableSelectOption[] = useMemo(() => {
    if (!usersData?.content) return [];
    return usersData.content.map((user) => ({
      value: user.id.toString(),
      label: user.fullName,
      description: user.email,
    }));
  }, [usersData]);

  // Transform roles to SearchableSelect options
  const roleOptions: SearchableSelectOption[] = useMemo(() => {
    if (!roles) {
      return [];
    }
    const options = roles.map((role) => ({
      value: role.name,
      label: role.name,
      description: role.description,
    }));
    return options;
  }, [roles]);

  // Get selected role details
  const selectedRole = useMemo(() => {
    if (!selectedRoleName || !roles) return null;
    return roles.find((role) => role.name === selectedRoleName);
  }, [selectedRoleName, roles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      toast.error("Please select a user");
      return;
    }

    if (!selectedRoleName) {
      toast.error("Please select a role");
      return;
    }

    try {
      await assignRoleMutation.mutateAsync({
        userId: parseInt(selectedUserId),
        roleName: selectedRoleName,
      });

      // Reset form and close dialog
      setOpen(false);
      setSelectedUserId("");
      setSelectedRoleName("");
    } catch (error) {
      // Error is handled by the mutation hook
      console.error("Failed to assign role:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId("");
    setSelectedRoleName("");
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        Add New Admin
      </Button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title="Assign Admin Role"
        hideTitle={true}
        className="m-4 items-center">
        <div className="no-scrollbar  h-full max-h-[80%] relative w-[600px] border overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-9">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Assign Admin Role
            </h4>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Select a user and assign them an administrative role.
            </p>
          </div>

          <form
            className="flex flex-col w-[520px] overflow-y-auto"
            onSubmit={handleSubmit}>
            <div className="custom-scrollbar min-h-[500px] overflow-y-auto px-2 pb-3">
              <div className="space-y-4">
                {/* User Selection */}
                <div>
                  <Label htmlFor="user">
                    Select User <span className="text-red-500">*</span>
                  </Label>
                  <SearchableSelect
                    options={userOptions}
                    value={selectedUserId}
                    onChange={setSelectedUserId}
                    placeholder={
                      isLoadingUsers ? "Loading users..." : "Select a user"
                    }
                    searchPlaceholder="Search by name or email..."
                    disabled={isLoadingUsers}
                    className="w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select a user to promote to an admin role
                  </p>
                </div>

                {/* Role Selection */}
                <div>
                  <Label htmlFor="role">
                    Select Role <span className="text-red-500">*</span>
                  </Label>
                  <SearchableSelect
                    options={roleOptions}
                    value={selectedRoleName}
                    onChange={setSelectedRoleName}
                    placeholder={
                      isLoadingRoles ? "Loading roles..." : "Select a role"
                    }
                    searchPlaceholder="Search roles..."
                    disabled={isLoadingRoles || !selectedUserId}
                    className="w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Choose the administrative role to assign
                  </p>
                </div>

                {/* Permissions Display */}
                {selectedRole && (
                  <div className="mt-8">
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">
                      Role Permissions
                    </h5>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      This role includes {selectedRole.permissionCount}{" "}
                      permission{selectedRole.permissionCount !== 1 ? "s" : ""}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedRole.permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-3 rounded-lg border-2 border-primary bg-primary/5 dark:bg-primary/10 transition cursor-not-allowed">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {permission.name}
                          </span>
                          <Switch
                            checked={true}
                            disabled={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={handleClose}
                disabled={assignRoleMutation.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={
                  !selectedUserId ||
                  !selectedRoleName ||
                  assignRoleMutation.isPending
                }>
                {assignRoleMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  "Assign Role"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

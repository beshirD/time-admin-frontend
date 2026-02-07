"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Modal } from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { useCreateRole } from "@/hooks/useCreateRole";
import { usePermissions } from "@/hooks/usePermissions";
import { Loader2 } from "lucide-react";

export function CreateRoleDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedPermissions: new Set<string>(),
  });

  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissions();
  const createRoleMutation = useCreateRole();

  // Group permissions by category
  const groupedPermissions = useMemo(() => {
    if (!permissions) return {};

    return permissions.reduce(
      (acc, permission) => {
        const category = permission.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
      },
      {} as Record<string, typeof permissions>,
    );
  }, [permissions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRoleMutation.mutateAsync({
        name: formData.name,
        description: formData.description,
        permissionCodes: Array.from(formData.selectedPermissions),
      });
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        selectedPermissions: new Set(),
      });
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", description: "", selectedPermissions: new Set() });
  };

  const togglePermission = (code: string) => {
    const newSelected = new Set(formData.selectedPermissions);
    if (newSelected.has(code)) {
      newSelected.delete(code);
    } else {
      newSelected.add(code);
    }
    setFormData({ ...formData, selectedPermissions: newSelected });
  };

  const toggleAllInCategory = (category: string) => {
    const categoryPermissions = groupedPermissions[category] || [];
    const allSelected = categoryPermissions.every((p) =>
      formData.selectedPermissions.has(p.code),
    );

    const newSelected = new Set(formData.selectedPermissions);
    categoryPermissions.forEach((p) => {
      if (allSelected) {
        newSelected.delete(p.code);
      } else {
        newSelected.add(p.code);
      }
    });
    setFormData({ ...formData, selectedPermissions: newSelected });
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        Create Role
      </Button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title="Create New Role"
        hideTitle={true}
        className="max-w-[900px] m-4">
        <div className="no-scrollbar relative h-full w-full max-w-[900px] border overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Role
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Create a new role and assign permissions to it.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={handleSubmit}>
            <div className="custom-scrollbar max-h-[500px] overflow-y-auto px-2 pb-3">
              <div className="space-y-6">
                {/* Role Name */}
                <div>
                  <Label htmlFor="name">
                    Role Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., MODERATOR"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Unique name for the role (uppercase recommended)
                  </p>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the role and its purpose..."
                    className="flex h-20 w-full rounded-md border-2 border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus:border-primary resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Brief description of the role
                  </p>
                </div>

                {/* Permissions Selection */}
                <div>
                  <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
                    Assign Permissions
                  </h5>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Select {formData.selectedPermissions.size} permission
                    {formData.selectedPermissions.size !== 1 ? "s" : ""}
                  </p>

                  {isLoadingPermissions ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedPermissions).map(
                        ([category, categoryPermissions]) => (
                          <div key={category}>
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                              <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                {category}
                              </h6>
                              <button
                                type="button"
                                onClick={() => toggleAllInCategory(category)}
                                className="text-xs text-primary hover:underline">
                                {categoryPermissions.every((p) =>
                                  formData.selectedPermissions.has(p.code),
                                )
                                  ? "Deselect All"
                                  : "Select All"}
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {categoryPermissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  onClick={() =>
                                    togglePermission(permission.code)
                                  }
                                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition cursor-pointer ${
                                    formData.selectedPermissions.has(
                                      permission.code,
                                    )
                                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                  }`}>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {permission.name}
                                  </span>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={formData.selectedPermissions.has(
                                        permission.code,
                                      )}
                                      onCheckedChange={() =>
                                        togglePermission(permission.code)
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={handleClose}
                disabled={createRoleMutation.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={
                  createRoleMutation.isPending ||
                  formData.selectedPermissions.size === 0
                }>
                {createRoleMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Role"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

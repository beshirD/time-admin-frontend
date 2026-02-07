"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Modal } from "@/components/ui/modal";
import { useCreatePermission } from "@/hooks/useCreatePermission";
import { Loader2 } from "lucide-react";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import type { SearchableSelectOption } from "@/components/ui/SearchableSelect";

// Common permission categories
const PERMISSION_CATEGORIES: SearchableSelectOption[] = [
  { value: "user", label: "User", description: "User management permissions" },
  { value: "role", label: "Role", description: "Role management permissions" },
  {
    value: "content",
    label: "Content",
    description: "Content management permissions",
  },
  {
    value: "order",
    label: "Order",
    description: "Order management permissions",
  },
  {
    value: "driver",
    label: "Driver",
    description: "Driver management permissions",
  },
  {
    value: "restaurant",
    label: "Restaurant",
    description: "Restaurant management permissions",
  },
  {
    value: "system",
    label: "System",
    description: "System configuration permissions",
  },
  { value: "report", label: "Report", description: "Reporting permissions" },
];

export function CreatePermissionDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: "",
  });

  const createPermissionMutation = useCreatePermission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPermissionMutation.mutateAsync(formData);
      setOpen(false);
      setFormData({ name: "", code: "", description: "", category: "" });
    } catch (error) {
      console.error("Failed to create permission:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", code: "", description: "", category: "" });
  };

  return (
    <>
      <Button
        usage="create"
        onClick={() => setOpen(true)}>
        Create Permission
      </Button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title="Create New Permission"
        hideTitle={true}
        className="max-w-[600px] m-4">
        <div className="no-scrollbar relative h-full w-full max-w-[600px] border overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create New Permission
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Define a new permission for role-based access control.
            </p>
          </div>

          <form
            className="flex flex-col"
            onSubmit={handleSubmit}>
            <div className="space-y-5 px-2 pb-3">
              {/* Permission Name */}
              <div>
                <Label htmlFor="name">
                  Permission Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., View User Profile"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Human-readable name for the permission
                </p>
              </div>

              {/* Permission Code */}
              <div>
                <Label htmlFor="code">
                  Permission Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="e.g., USER_VIEW"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Unique code identifier (uppercase with underscores)
                </p>
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <SearchableSelect
                  options={PERMISSION_CATEGORIES}
                  value={formData.category}
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  placeholder="Select a category"
                  searchPlaceholder="Search categories..."
                  className="w-full"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Group this permission belongs to
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
                  placeholder="Describe what this permission allows..."
                  className="flex h-20 w-full rounded-md border-2 border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus:border-primary resize-none"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Detailed description of the permission
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={handleClose}
                disabled={createPermissionMutation.isPending}>
                Cancel
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={createPermissionMutation.isPending}>
                {createPermissionMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Permission"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

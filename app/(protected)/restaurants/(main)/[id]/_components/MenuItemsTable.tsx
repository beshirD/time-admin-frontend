"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useDeleteMenuItem } from "@/hooks/useDeleteMenuItem";
import { MenuItem } from "@/types/entities";
import { MenuItemDetailDialog } from "./MenuItemDetailDialog";
import { CreateMenuItemDialog } from "./CreateMenuItemDialog";
import { EditMenuItemDialog } from "./EditMenuItemDialog";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { Modal } from "@/components/ui/modal";

export function MenuItemsTable() {
  const params = useParams();
  const restaurantId = params.id as string;
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuItemToDelete, setMenuItemToDelete] = useState<MenuItem | null>(
    null,
  );

  const { menuItems, isLoading, error } = useMenuItems({ restaurantId });
  const deleteMenuItem = useDeleteMenuItem();

  const getItemTypeBadge = (type: string) => {
    const styles = {
      VEG: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      NON_VEG: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      VEGAN: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return styles[type as keyof typeof styles] || styles.VEG;
  };

  const handleRowClick = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsDetailDialogOpen(true);
  };

  const handleViewClick = (menuItem: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMenuItem(menuItem);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (menuItem: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMenuItem(menuItem);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (menuItem: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuItemToDelete(menuItem);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (menuItemToDelete) {
      deleteMenuItem.mutate(menuItemToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setMenuItemToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton
          rows={5}
          columns={6}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">
            Failed to load menu items. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Menu Items
          </h3>
          <Button
            usage="create"
            onClick={() => setIsCreateDialogOpen(true)}>
            Add Menu Item
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.category?.title || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getItemTypeBadge(item.itemType)}`}>
                      {item.itemType.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    AFN {item.basePrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.stock}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.isAvailable
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        usage="view"
                        onClick={(e) => handleViewClick(item, e)}>
                        View
                      </Button>
                      <Button
                        usage="edit"
                        onClick={(e) => handleEditClick(item, e)}>
                        Edit
                      </Button>
                      <Button
                        usage="delete"
                        onClick={(e) => handleDeleteClick(item, e)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No menu items added yet
            </p>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <MenuItemDetailDialog
        menuItem={selectedMenuItem}
        isOpen={isDetailDialogOpen}
        onClose={() => {
          setIsDetailDialogOpen(false);
          setSelectedMenuItem(null);
        }}
      />

      {/* Create Dialog */}
      <CreateMenuItemDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {/* Edit Dialog */}
      <EditMenuItemDialog
        menuItem={selectedMenuItem}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedMenuItem(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setMenuItemToDelete(null);
        }}
        className="max-w-[500px] m-4">
        <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Delete Menu Item
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete &quot;{menuItemToDelete?.title}
              &quot;? This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setMenuItemToDelete(null);
              }}
              disabled={deleteMenuItem.isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={confirmDelete}
              disabled={deleteMenuItem.isPending}
              className="bg-red-600 hover:bg-red-700 text-white">
              {deleteMenuItem.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteRestaurant } from "@/hooks/useDeleteRestaurant";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/Button";

interface RestaurantHeaderProps {
  restaurantId: string;
  restaurantName: string;
  status: string;
}

export function RestaurantHeader({
  restaurantId,
  restaurantName,
  status,
}: RestaurantHeaderProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteRestaurant = useDeleteRestaurant();

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "suspended":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleDelete = () => {
    deleteRestaurant.mutate(restaurantId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        router.push("/restaurants");
      },
    });
  };

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg px-5 py-3 border gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/restaurants"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {restaurantName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </span>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            className=""
            usage="delete">
            Delete Restaurant
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="max-w-[500px] m-4">
        <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Delete Restaurant
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete &quot;{restaurantName}&quot;? This
              action cannot be undone.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteRestaurant.isPending}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={deleteRestaurant.isPending}
              className="bg-red-600 hover:bg-red-700 text-white">
              {deleteRestaurant.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

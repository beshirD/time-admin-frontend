"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { CreatePostModal } from "./CreatePostModal";
import type { NotificationPost } from "@/types/entities";

// Mock data - replace with actual API call
const mockNotificationPosts: NotificationPost[] = [
  {
    id: 1,
    title: "Friday discounts are now available",
    description: "Check out our amazing Friday discounts!",
    state: "Active",
    createdOn: "2025-11-21T18:43:13Z",
    createdBy: "Admins",
  },
  {
    id: 2,
    title: "test cust app redirect",
    description: "Testing customer app redirect functionality",
    state: "Active",
    createdOn: "2025-11-21T13:02:16Z",
    createdBy: "Admins",
  },
  {
    id: 3,
    title: "test after fix",
    description: "Testing after bug fix",
    state: "Active",
    createdOn: "2025-11-20T22:29:06Z",
    createdBy: "Admins",
  },
  {
    id: 4,
    title: "after fix",
    description: "Post after fix implementation",
    state: "Active",
    createdOn: "2025-11-20T21:59:59Z",
    createdBy: "Admins",
  },
  {
    id: 5,
    title: "after push fix",
    description: "Testing after push fix",
    state: "Active",
    createdOn: "2025-11-20T21:39:29Z",
    createdBy: "Admins",
  },
  {
    id: 6,
    title: "push testing",
    description: "Testing push notifications",
    state: "Active",
    createdOn: "2025-11-20T21:26:33Z",
    createdBy: "Admins",
  },
  {
    id: 7,
    title: "hello, Time community",
    description: "Welcome message to Time community",
    state: "Active",
    createdOn: "2025-11-19T15:52:35Z",
    createdBy: "Admins",
  },
  {
    id: 8,
    title: "test cust app redirect",
    description: "Testing customer app redirect",
    state: "Active",
    createdOn: "2025-11-19T14:43:59Z",
    createdBy: "Admins",
  },
  {
    id: 9,
    title: "test cust app redirect",
    description: "Another test for customer app redirect",
    state: "Active",
    createdOn: "2025-11-19T14:26:49Z",
    createdBy: "Admins",
  },
  {
    id: 10,
    title: "test cust app redirect",
    description: "Testing redirect functionality",
    state: "Active",
    createdOn: "2025-11-19T14:07:24Z",
    createdBy: "Admins",
  },
  {
    id: 11,
    title: "test cust app redirect",
    description: "Redirect test",
    state: "Active",
    createdOn: "2025-11-19T14:02:11Z",
    createdBy: "Admins",
  },
  {
    id: 12,
    title: "test cust app redirect",
    description: "Final redirect test",
    state: "Active",
    createdOn: "2025-11-19T13:34:49Z",
    createdBy: "Admins",
  },
];

export function PostNotificationContent() {
  const [posts, setPosts] = useState<NotificationPost[]>(mockNotificationPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = (data: { title: string; description: string }) => {
    // Mock create - replace with actual API call
    const newPost: NotificationPost = {
      id: posts.length + 1,
      title: data.title,
      description: data.description,
      state: "Active",
      createdOn: new Date().toISOString(),
      createdBy: "Admins",
    };

    setPosts([newPost, ...posts]);
    console.log("Created new post:", newPost);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between p-6 bg-white border dark:bg-gray-900 rounded-lg ">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Post Notification
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and create notification posts
            </p>
          </div>
          <Button
            usage="create"
            onClick={() => setIsModalOpen(true)}
            className="gap-2">
            Create New Post
          </Button>
        </div>

        {/* Notification History Table */}
        <div className="p-6 bg-white border dark:bg-gray-900 rounded-lg ">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notification History
          </h2>
          <DataTable
            columns={columns}
            data={posts}
            searchPlaceholder="Search notifications..."
            searchableColumns={["title", "createdBy"]}
            enableSearch={true}
            enableColumnVisibility={false}
          />
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}

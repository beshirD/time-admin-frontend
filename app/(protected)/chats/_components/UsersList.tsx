"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { ChatUser } from "@/types/entities";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UsersListProps {
  users: ChatUser[];
  selectedUserId: number | null;
  onSelectUser: (userId: number) => void;
}

const filterTabs = ["All", "Unread", "Groups", "Favorites"];

export function UsersList({
  users,
  selectedUserId,
  onSelectUser,
}: UsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-[400px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-full overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, messages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab
                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Users List */}
      <ScrollArea className="flex-1 h-0 min-h-0">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-white/50 dark:hover:bg-gray-800/50 transition border-b border-gray-200 dark:border-gray-800 ${
              selectedUserId === user.id ? "bg-white dark:bg-gray-800" : ""
            }`}>
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-orange-800 dark:text-orange-200 font-semibold text-lg">
                {user.avatar || user.name.substring(0, 2).toUpperCase()}
              </div>
              {user.status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                  {user.lastMessageTime}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {user.lastMessage || "No messages yet"}
              </p>
            </div>

            {/* Unread Badge */}
            {user.unreadCount && user.unreadCount > 0 && (
              <div className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-semibold">
                  {user.unreadCount}
                </span>
              </div>
            )}
          </button>
        ))}
      </ScrollArea>
    </div>
  );
}

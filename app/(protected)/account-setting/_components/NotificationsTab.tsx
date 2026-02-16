"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Bell,
  CheckCheck,
  Package,
  AlertCircle,
  Info,
  Megaphone,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CalendarIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types/entities";

// Mock data - replace with actual API call
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #12345 has been placed by John Doe. Total amount: $45.99",
    type: "order",
    status: "unread",
    createdAt: "2026-02-16T08:30:00Z",
    actionUrl: "/orders/12345",
  },
  {
    id: 2,
    title: "System Maintenance Scheduled",
    message:
      "System maintenance is scheduled for Feb 20, 2026 from 2:00 AM to 4:00 AM EST.",
    type: "system",
    status: "unread",
    createdAt: "2026-02-15T14:20:00Z",
  },
  {
    id: 3,
    title: "Special Promotion Available",
    message:
      "Get 20% off on all premium features this week! Limited time offer.",
    type: "promotion",
    status: "read",
    createdAt: "2026-02-14T10:15:00Z",
  },
  {
    id: 4,
    title: "Payment Failed",
    message:
      "Payment for subscription renewal failed. Please update your payment method.",
    type: "alert",
    status: "unread",
    createdAt: "2026-02-13T16:45:00Z",
    actionUrl: "/account-setting?tab=billing",
  },
  {
    id: 5,
    title: "Profile Updated Successfully",
    message: "Your profile information has been updated successfully.",
    type: "info",
    status: "read",
    createdAt: "2026-02-12T09:30:00Z",
  },
  {
    id: 6,
    title: "New Feature Released",
    message:
      "Check out our new analytics dashboard with advanced reporting features!",
    type: "info",
    status: "read",
    createdAt: "2026-02-11T11:00:00Z",
  },
  {
    id: 7,
    title: "Order Delivered",
    message: "Order #12340 has been successfully delivered to the customer.",
    type: "order",
    status: "read",
    createdAt: "2026-02-10T15:20:00Z",
  },
  {
    id: 8,
    title: "New Customer Registration",
    message: "A new customer Jane Smith has registered on your platform.",
    type: "info",
    status: "read",
    createdAt: "2026-02-09T11:45:00Z",
  },
  {
    id: 9,
    title: "Low Stock Alert",
    message: "Product 'Premium Coffee Beans' is running low on stock.",
    type: "alert",
    status: "read",
    createdAt: "2026-02-08T09:15:00Z",
  },
  {
    id: 10,
    title: "Monthly Report Ready",
    message: "Your monthly sales report for January 2026 is now available.",
    type: "info",
    status: "read",
    createdAt: "2026-02-07T08:00:00Z",
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "order":
      return <Package className="w-5 h-5" />;
    case "system":
      return <SettingsIcon className="w-5 h-5" />;
    case "promotion":
      return <Megaphone className="w-5 h-5" />;
    case "alert":
      return <AlertCircle className="w-5 h-5" />;
    case "info":
      return <Info className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "order":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
    case "system":
      return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30";
    case "promotion":
      return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
    case "alert":
      return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
    case "info":
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

export function NotificationsTab() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Filter notifications by status and date range
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by read/unread status
    if (filter === "unread") {
      filtered = filtered.filter((n) => n.status === "unread");
    }

    // Filter by date range
    if (dateRange?.from) {
      const start = new Date(dateRange.from);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((n) => new Date(n.createdAt) >= start);
    }

    if (dateRange?.to) {
      const end = new Date(dateRange.to);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((n) => new Date(n.createdAt) <= end);
    }

    return filtered;
  }, [notifications, filter, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / pageSize);
  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredNotifications.slice(startIndex, endIndex);
  }, [filteredNotifications, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, dateRange]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.status === "unread").length;
  }, [notifications]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" as const } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, status: "read" as const })),
    );
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  const clearDateFilter = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  const hasActiveFilters =
    dateRange?.from || dateRange?.to || filter === "unread";

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(
    currentPage * pageSize,
    filteredNotifications.length,
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="p-6 border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAllAsRead}
              className="gap-2">
              <CheckCheck className="w-4 h-4" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                filter === "all"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
              )}>
              All
              {filter === "all" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative flex items-center gap-2",
                filter === "unread"
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
              )}>
              Unread
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-primary rounded-full">
                  {unreadCount}
                </span>
              )}
              {filter === "unread" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-3">
            <div
              className="relative"
              ref={calendarRef}>
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/25 border-2 border-primary rounded-lg transition">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from && dateRange?.to ? (
                  <span>
                    {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                    {format(dateRange.to, "MMM dd, yyyy")}
                  </span>
                ) : (
                  <span>Filter by Start & End Date</span>
                )}
              </button>

              {isCalendarOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Select Date Range
                    </h3>
                    {(dateRange?.from || dateRange?.to) && (
                      <button
                        onClick={clearDateFilter}
                        className="text-xs text-primary hover:underline">
                        Clear
                      </button>
                    )}
                  </div>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={2}
                    className="rounded-md"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => setIsCalendarOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Info */}
            {hasActiveFilters && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredNotifications.length} notification
                {filteredNotifications.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="border rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 overflow-hidden">
        {paginatedNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              No notifications
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {hasActiveFilters
                ? "No notifications match your filters"
                : filter === "unread"
                  ? "You have no unread notifications"
                  : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-5 transition-colors hover:bg-primary/15 dark:hover:bg-primary/25",
                    notification.status === "unread" &&
                      "bg-primary/10 dark:bg-primary/20",
                  )}>
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                        getNotificationColor(notification.type),
                      )}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4
                          className={cn(
                            "text-base font-semibold",
                            notification.status === "unread"
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300",
                          )}>
                          {notification.title}
                        </h4>
                        <span className="text-base text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {notification.message}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {notification.status === "unread" && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                            Mark as read
                          </button>
                        )}
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            View details →
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Unread Indicator */}
                    {notification.status === "unread" && (
                      <div className="shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
                  {filteredNotifications.length > 0 ? (
                    <>
                      Showing {startItem} to {endItem} of{" "}
                      {filteredNotifications.length} entries
                    </>
                  ) : (
                    "No entries"
                  )}
                </div>
                <div className="flex items-center gap-6 lg:gap-8">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rows per page
                    </p>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="h-8 w-[70px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
                      {[5, 10, 20, 30].map((size) => (
                        <option
                          key={size}
                          value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      <span className="sr-only">Go to first page</span>
                      <ChevronsLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      <span className="sr-only">Go to next page</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                      <span className="sr-only">Go to last page</span>
                      <ChevronsRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import PageTitle from "@/components/common/PageTitle";
import Input from "@/components/ui/Input";
import { CreditCard, Search } from "lucide-react";
import { CreateBannerDialog } from "./CreateBannerDialog";
import Link from "next/link";

interface BannerHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function BannerHeader({
  searchQuery,
  onSearchChange,
}: BannerHeaderProps) {
  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-center border bg-white dark:bg-gray-900 p-5 rounded-lg sm:justify-between gap-4">
      <div className="flex gap-4 items-center w-full">
        <PageTitle title="Banner Management" />

        {/* Search Section */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-300 z-50 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search banners by name, restaurant, or status..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 border-2 border-primary/90 dark:border-primary/70"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 w-full">
        <Link
          href="/banner/packages"
          className="gap-3 flex items-center px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 border border-gray-200 bg-slate-100 dark:bg-background/50 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <CreditCard className="w-4 h-4" />
          Banner Packages
        </Link>
        <CreateBannerDialog />
      </div>
    </div>
  );
}

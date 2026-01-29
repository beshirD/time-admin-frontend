"use client";

import React from "react";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { CreditCard, Search } from "lucide-react";
import { CreateBannerDialog } from "./CreateBannerDialog";

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

      <div className="flex justify-end items-center gap-3 w-full">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => console.log("Banner subscriptions clicked")}>
          <CreditCard className="w-4 h-4" />
          Banner Subscriptions
        </Button>
        <CreateBannerDialog />
      </div>
    </div>
  );
}

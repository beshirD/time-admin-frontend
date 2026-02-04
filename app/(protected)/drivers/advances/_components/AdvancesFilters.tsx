"use client";

import { useState, useEffect, useRef } from "react";
import Input from "@/components/ui/Input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import Checkbox from "@/components/ui/Checkbox";

interface AdvancesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedStatuses: string[];
  onStatusToggle: (status: string) => void;
}

export default function AdvancesFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedStatuses,
  onStatusToggle,
}: AdvancesFiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
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

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      onDateRangeChange(range);
    }
  };

  const clearDateFilter = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex gap-5 justify-between">
      {/* Search */}
      <Input
        placeholder="Search by driver name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-4xl border-2 outline-primary border-primary/40 dark:border-primary/70"
      />

      {/* Date Range Filter */}
      <div className="flex gap-4">
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
            <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
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

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/25 border-2 border-primary rounded-lg transition">
            Filter by Status
            {selectedStatuses.length > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-white rounded-full">
                {selectedStatuses.length}
              </span>
            )}
          </button>
          <Dropdown
            isOpen={isStatusDropdownOpen}
            onClose={() => setIsStatusDropdownOpen(false)}
            className="w-48">
            <div className="py-1">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                Select Status
              </div>
              {["Active", "Settled", "Cancelled"].map((status) => (
                <div
                  key={status}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Checkbox
                    label={status}
                    checked={selectedStatuses.includes(status)}
                    onChange={() => onStatusToggle(status)}
                  />
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

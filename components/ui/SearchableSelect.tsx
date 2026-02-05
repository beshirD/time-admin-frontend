"use client";

import * as React from "react";
import { Check, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Input from "@/components/ui/Input";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";

export interface SearchableSelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  disabled = false,
  className,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border-2 border-gray-200 bg-transparent px-3 py-2 text-sm outline-none transition-all focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:focus:border-primary",
          !selectedOption && "text-muted-foreground",
          isOpen && "border-primary ring-1 ring-primary/20",
          className,
        )}>
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearchQuery("");
        }}
        className="w-full min-w-[300px] mt-1 p-2">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 border-gray-200 dark:border-gray-800"
          />
        </div>
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No options found.
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-3 text-sm outline-none hover:bg-primary/10 hover:text-primary transition-colors",
                  value === opt.value &&
                    "bg-primary/10 text-primary font-medium",
                )}>
                <div className="flex flex-col items-start gap-1">
                  <span>{opt.label}</span>
                  {opt.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {opt.description}
                    </span>
                  )}
                </div>
                {value === opt.value && <Check className="ml-auto h-4 w-4" />}
              </button>
            ))
          )}
        </div>
      </Dropdown>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // Search configuration
  searchPlaceholder?: string;
  searchableColumns?: string[]; // Column IDs to search in
  enableSearch?: boolean;

  // Column visibility
  enableColumnVisibility?: boolean;

  // Server-side pagination
  manualPagination?: boolean;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  totalItems?: number;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;

  // Server-side sorting
  manualSorting?: boolean;
  onSortingChange?: (sorting: SortingState) => void;

  // Loading state
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchableColumns = [],
  enableSearch = true,
  enableColumnVisibility = true,
  manualPagination = false,
  pageCount: controlledPageCount,
  pageIndex: controlledPageIndex,
  pageSize: controlledPageSize,
  totalItems,
  onPaginationChange,
  manualSorting = false,
  onSortingChange: externalSortingChange,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnDropdownOpen, setColumnDropdownOpen] = React.useState(false);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Pagination state
  const [pagination, setPagination] = React.useState({
    pageIndex: controlledPageIndex ?? 0,
    pageSize: controlledPageSize ?? 10,
  });

  // Sync controlled pagination with internal state
  React.useEffect(() => {
    if (controlledPageIndex !== undefined) {
      setPagination((prev) => ({ ...prev, pageIndex: controlledPageIndex }));
    }
  }, [controlledPageIndex]);

  React.useEffect(() => {
    if (controlledPageSize !== undefined) {
      setPagination((prev) => ({ ...prev, pageSize: controlledPageSize }));
    }
  }, [controlledPageSize]);

  // Handle sorting changes
  const handleSortingChange = React.useCallback(
    (updater: any) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      if (manualSorting && externalSortingChange) {
        externalSortingChange(newSorting);
      }
    },
    [sorting, manualSorting, externalSortingChange],
  );

  // Handle pagination changes
  const handlePaginationChange = React.useCallback(
    (updater: any) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      if (manualPagination && onPaginationChange) {
        onPaginationChange(newPagination.pageIndex, newPagination.pageSize);
      }
    },
    [pagination, manualPagination, onPaginationChange],
  );

  // Global filter function
  const globalFilterFn = React.useCallback(
    (row: any, columnId: string, filterValue: string) => {
      const searchValue = filterValue.toLowerCase();

      // If no searchable columns specified, search all columns
      const columnsToSearch =
        searchableColumns.length > 0
          ? searchableColumns
          : columns
              .map((col) => (typeof col.id === "string" ? col.id : ""))
              .filter(Boolean);

      return columnsToSearch.some((colId) => {
        const value = row.getValue(colId);
        return String(value || "")
          .toLowerCase()
          .includes(searchValue);
      });
    },
    [searchableColumns, columns],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    globalFilterFn,
    manualPagination,
    manualSorting,
    pageCount: controlledPageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  // Calculate display values
  const currentPageSize = table.getState().pagination.pageSize;
  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalPages = manualPagination
    ? (controlledPageCount ?? 0)
    : table.getPageCount();

  const displayedItems = manualPagination
    ? data.length
    : table.getFilteredRowModel().rows.length;

  const totalDisplayItems = manualPagination
    ? (totalItems ?? 0)
    : table.getCoreRowModel().rows.length;

  const startItem = currentPageIndex * currentPageSize + 1;
  const endItem = Math.min(startItem + displayedItems - 1, totalDisplayItems);

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {enableSearch && (
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-xl"
            disabled={isLoading}
          />
        )}
        {enableColumnVisibility && (
          <div className="relative ml-auto">
            <button
              onClick={() => setColumnDropdownOpen(!columnDropdownOpen)}
              className="dropdown-toggle inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              disabled={isLoading}>
              <Settings2 className="h-4 w-4" />
              Edit Columns
            </button>
            <Dropdown
              isOpen={columnDropdownOpen}
              onClose={() => setColumnDropdownOpen(false)}
              className="w-48">
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  Toggle columns
                </div>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <div
                        key={column.id}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Checkbox
                          label={column.id}
                          checked={column.getIsVisible()}
                          onChange={(value) => column.toggleVisibility(!!value)}
                        />
                      </div>
                    );
                  })}
              </div>
            </Dropdown>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700/90">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
          {totalDisplayItems > 0 ? (
            <>
              Showing {startItem} to {endItem} of {totalDisplayItems} entries
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
              value={currentPageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              disabled={isLoading}
              className="h-8 w-[70px] rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {currentPageIndex + 1} of {totalPages || 1}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.setPageIndex(totalPages - 1)}
              disabled={!table.getCanNextPage() || isLoading}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

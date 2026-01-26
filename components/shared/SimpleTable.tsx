import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface SimpleTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField?: keyof T;
  emptyMessage?: string;
}

export function SimpleTable<T>({
  data,
  columns,
  keyField = "id" as keyof T,
  emptyMessage = "No results found.",
}: SimpleTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-blue-light-100 dark:bg-blue-light-900/20">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={`px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider ${col.className || ""}`}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={String(item[keyField] || rowIndex)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                        ? String(item[col.accessorKey])
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { type ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  keyExtractor: (row: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No data found",
  keyExtractor,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary text-sm bg-surface rounded-xl border border-border-custom">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface shadow-sm">
      <table className="w-full text-sm min-w-[540px]">
        <thead>
          <tr className="bg-surface-elevated border-b border-border-custom">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3.5 text-left font-semibold text-text-secondary text-xs uppercase tracking-wider ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-custom">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="hover:bg-surface-elevated/50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3.5 text-text-primary ${col.className ?? ""}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


import type { Column } from "../types";
import { gridStyles } from "../datagrid.styles";

interface Props<T> {
  columns: Column<T>[];
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  sortKey: string | null;
  sortDir: "asc" | "desc";
  onSort: (key: keyof T) => void;
}

export function TableHeader<T>({
  columns,
  filters,
  onFilterChange,
  sortKey,
  sortDir,
  onSort,
}: Props<T>) {
  return (
    <thead>

      {/* ردیف عنوان‌ها */}
      <tr className={gridStyles.headerRow}>
        {columns.map((col, i) => (
        
            <th
            key={i}
            className={gridStyles.headerCell + (col.sortable ? " cursor-pointer select-none" : "")}
            onClick={() => col.sortable && onSort(col.key as keyof T)}
          >
            <div className="flex items-center gap-1 select-none">
              {col.label}

              {col.sortable && (
                
                  <span
                  className={`
                    text-gray-400 text-xs transition
                    ${sortKey === col.key ? "text-blue-500" : "opacity-40"}
                  `}
                >
                  {sortKey === col.key
                    ? sortDir === "asc"
                      ? "↑"
                      : "↓"
                    : "⇅"}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>

      {/* ردیف فیلترها */}
      <tr className="bg-gray-50 border-b">
        {columns.map((col, i) => (
          <th key={i} className="px-2 py-2">
            {col.filterable && (
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full border px-2 py-1 text-sm rounded"
                value={filters[col.key as string] || ""}
                onChange={(e) =>
                  onFilterChange(String(col.key), e.target.value)
                }
              />
            )}
          </th>
        ))}
      </tr>

    </thead>
  );
}

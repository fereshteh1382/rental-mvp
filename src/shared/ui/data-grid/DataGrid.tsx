import React, { useState, useMemo } from "react";
import type { Column } from "./types";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { Pagination } from "./components/Pagination";
import { gridStyles } from "./datagrid.styles";

interface Props {
  columns: Column[];
  pageSize?: number;
  data: [];
}

export function DataGrid({ columns, data, pageSize = 5 }: Props) {

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        if (!filters[col.key as string]) return true;
        return String(row[col.key])
          .toLowerCase()
          .includes(filters[col.key as string].toLowerCase());
      })
    );
  }, [data, filters, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={gridStyles.container}>
      <table className={gridStyles.table}>
        
        <TableHeader
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
          sortKey={sortKey as string}
          sortDir={sortDir}
          onSort={handleSort}
        />
        <TableBody columns={columns} data={paginated} />
      </table>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );

}

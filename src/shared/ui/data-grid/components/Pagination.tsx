import React from "react";
import { gridStyles } from "../datagrid.styles";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className={gridStyles.paginationContainer}>
    {/*   <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        قبلی
      </button> */}
      <button
        className={`${gridStyles.button} ${gridStyles.btnPrev}`}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        قبلی
      </button>
      {/* <span>{page} / {totalPages}</span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        بعدی
      </button> */}
      <span className="text-sm text-gray-600">
        صفحه {page} از {totalPages}
      </span>

      <button
        className={`${gridStyles.button} ${gridStyles.btnNext}`}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
      >
        بعدی
      </button>
    </div>
  );
}

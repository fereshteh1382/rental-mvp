
import type { Column } from "../types";
import { gridStyles } from "../datagrid.styles";

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

export function TableBody<T>({ columns, data }: Props<T>) {
  return (
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className={gridStyles.bodyRow}>
          {columns.map((col, i) => (
            <td key={i} className={gridStyles.bodyCell}>
              {col.render ? col.render(row) : (row as any)[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

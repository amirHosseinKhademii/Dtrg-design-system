import { memo, Fragment, Suspense } from "react";
import { classNames } from "utils";
import { useToggle } from "hooks/use-toggle";
import { TableCell } from "../table-cell";
import { TableRowLoading } from "./table-row-loading";
import { ITableRow } from "../types/table";

export const TableRow = memo(
  ({
    item,
    columns,
    expand,
    loading,
    index,
    length,
    onRowClick,
    expanded = { id: null },
  }: ITableRow) => {
    const { open, toggle } = useToggle(() =>
      item ? item.id === expanded.id : false
    );

    return (
      <Fragment>
        <tr
          className={classNames(
            "w-full row-start h-14 px-6  overflow-hidden border-gray-300 dark:border-gray-600",
            loading ? "opacity-50 " : "group",
            index !== length - 1 && !open && "border-b",
            expand || (onRowClick && "cursor-pointer"),
            open
              ? "bg-blue-100 dark:bg-gray-700"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          )}
          onClick={() => {
            if (expand) toggle();
            onRowClick?.(item);
          }}
          role="row"
        >
          {(columns || []).map((column, index) => (
            <TableCell
              key={index}
              item={item}
              index={index}
              column={column}
              columns={columns}
            />
          ))}
        </tr>
        <Suspense fallback={<TableRowLoading columns={columns} />}>
          {open && expand && (
            <tr
              className={classNames(
                "w-full row-start p-4 bg-blue-100 dark:bg-gray-700"
              )}
            >
              {expand(item)}
            </tr>
          )}
        </Suspense>
      </Fragment>
    );
  }
);

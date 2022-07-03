export type TColumn = {
  head?: string;
  key: string;
  width?: string;
  render?: (data: TTableItem) => ReactNode;
};

export type TTableItem = any;

export type ITable = {
  columns: TColumn[];
  data: TTableItem[];
  className?: string;
  loading?: boolean;
  fetching?: boolean;
  page: number;
  total: number;
  expanded?: Record<string, any>;
  onRowClick?: (item: TTableItem) => void;
  expand?: (item: TTableItem) => ReactNode;
  onPaginate?: (page: number) => void;
};

export type ITableBody = Pick<
  ITable,
  "columns" | "expand" | "loading" | "onRowClick" | "expanded" | "data"
>;

export type ITableCell = {
  item: TTableItem;
  index?: number;
  column: TColumn;
} & Omit<ITableBody, "data">;

export type ITableRow = {
  item: TTableItem;
  index?: number;
  length: number;
} & Pick<ITable, "columns" | "expand" | "loading" | "onRowClick" | "expanded">;

export type ITableHead = Pick<ITable, "columns" | "loading">;

export interface SheetData {
  values: any[][];
  headers: string[];
  rowCount: number;
}

export interface SheetMetadata {
  id: string;
  name: string;
  url: string;
  sheets: {
    title: string;
    index: number;
    rowCount: number;
    columnCount: number;
  }[];
}

export interface ColumnType {
  name: string;
  type: "text" | "number" | "date" | "boolean" | "url" | "email";
  required: boolean;
  searchable: boolean;
  filterable: boolean;
}

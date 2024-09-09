import { GridColDef } from "@mui/x-data-grid";
import { GridColType } from "@mui/x-data-grid/models/colDef/gridColType";

export interface AppGridColDef<D extends object> extends GridColDef {
    field: Extract<keyof D, string>,
    create?: boolean;
    defaultValue?: any;
    altType?: "select" | "rating" | "slider" | "toggle" | GridColType;
    values?: string[];
}

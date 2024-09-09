import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {
    formatLocalDateTime,
    formatNonLocaleNumber,
    styleBooleanCell
} from "services/gridFormater";

import {Roles} from "@bikairproject/shared";

export const columns: AppGridColDef<Roles>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 300,
        editable: false,
        type: "string",
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "name",
        headerName: "Nom",
        width: 200,
        type: "string"
    },
    {
        field: "active",
        headerName: "Actif",
        width: 100,
        type: "boolean",
        defaultValue: false,
        cellClassName: styleBooleanCell
    },
    {
        field: "description",
        headerName: "Description",
        width: 300,
        type: "string",
        renderCell: CellExpandRenderer,
    },
    {
        field: "access_rights",
        headerName: "Access Right",
        width: 300,
        type: "string",
        renderCell: CellExpandRenderer,
    },
    {
        field: "created_at",
        headerName: "Date Création",
        width: 300,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
    {
        field: "updated_at",
        headerName: "Date Modification",
        width: 300,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    }
];

import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { formatLocalDateTime, formatNonLocaleNumber, styleBooleanCell } from "services/gridFormater";

import { GetReportsOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetReportsOutputData>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "uuid",
        headerName: "UUID",
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "bike_name",
        headerName: "Vélo",
        width: 100,
        type: "string",
        editable: false
    },
    {
        field: "admin_fullname",
        headerName: "Admin",
        width: 200,
        type: "string"
    },
    {
        field: "spot_name",
        headerName: "Spot",
        width: 200,
        type: "string"
    },
    {
        field: "incidents_string",
        headerName: "Incidents",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "comment",
        headerName: "Commentaire",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "workshop",
        headerName: "Dépôt",
        width: 150,
        type: "string"
    },
    {
        field: "report_coordinates",
        headerName: "Coordonnée",
        width: 200,
        type: "string",
        editable: false,
        filterable: false
    },
    {
        field: "battery_changed",
        headerName: "Batterie changé",
        width: 100,
        type: "boolean",
        cellClassName: styleBooleanCell
    },
    {
        field: "pick_up",
        headerName: "Ramassé",
        width: 100,
        type: "boolean",
        cellClassName: styleBooleanCell
    },
    {
        field: "created_at",
        headerName: "Date Création",
        width: 200,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
    {
        field: "updated_at",
        headerName: "Date Modification",
        width: 200,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
];

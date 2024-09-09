import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { formatLocalDateTime, formatNonLocaleNumber, formatTranslate } from "services/gridFormater";

import { GetBikesOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetBikesOutputData>[] = [
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
        field: "name",
        headerName: "Nom",
        width: 100,
        type: "string"
    },
    {
        field: "tracker_id",
        headerName: "ID Tracker",
        width: 100,
        type: "number",
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "battery_id",
        headerName: "ID Batterie",
        width: 100,
        type: "number",
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "lock_id",
        headerName: "ID Cadenas",
        width: 100,
        type: "number",
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "lock_version",
        headerName: "Version Cadenas",
        width: 100,
        type: "string"
    },
    {
        field: "imei",
        headerName: "IMEI",
        width: 150,
        type: "string"
    },
    {
        field: "city_name",
        headerName: "Ville",
        width: 200,
        type: "string"
    },
    {
        field: "status",
        headerName: "Statut",
        width: 150,
        type: "string",
        valueFormatter: formatTranslate("bike.status.")
    },
    {
        field: "tags",
        headerName: "Tags",
        width: 200,
        type: "string",
        valueFormatter: formatTranslate("bike.tags."),
        renderCell: CellExpandRenderer
    },
    {
        field: "speed",
        headerName: "Vitesse",
        width: 100,
        type: "number"
    },
    {
        field: "address",
        headerName: "Adresse",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "recent_coordinates",
        headerName: "Coordonnée",
        width: 200,
        type: "string",
        editable: false,
        filterable: false,
        renderCell: CellExpandRenderer
    },
    {
        field: "tracker_coordinates",
        headerName: "Coordonnée Tracker",
        width: 200,
        type: "string",
        editable: false,
        filterable: false,
        renderCell: CellExpandRenderer
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

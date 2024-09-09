import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { formatLocalDateTime, formatNonLocaleNumber } from "services/gridFormater";

import { GetCitiesOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetCitiesOutputData>[] = [
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
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "country_id",
        headerName: "ID Pays",
        width: 150,
        type: "number",
        editable: false
    },
    {
        field: "status",
        headerName: "Status",
        width: 150,
        type: "string",
        editable: false
    },
    {
        field: "postal_code",
        headerName: "Code Postal",
        width: 150,
        type: "string",
        editable: false
    },
    {
        field: "polygon",
        headerName: "Polygon",
        width: 100,
        type: "string",
        editable: false,
        filterable: false
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

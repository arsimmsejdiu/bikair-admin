import {AppGridColDef} from "models/interfaces/AppGridColDef";
import {StatusValues} from "models/values/StatusValues";
import {formatLocalDateTime, formatNonLocaleNumber, formatTranslate} from "services/gridFormater";

import {CityPolygons} from "@bikairproject/shared";

export const columns: AppGridColDef<CityPolygons>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "city_id",
        headerName: "City ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "name",
        headerName: "Nom de Ville",
        width: 200,
        type: "string"
    },
    {
        field: "status",
        headerName: "Statut",
        width: 150,
        type: "string",
        altType: "select",
        values: StatusValues,
        defaultValue: "ACTIVE",
        valueFormatter: formatTranslate("status-values.")
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

import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { store } from "redux/store";
import { formatLocalDateTime, formatNonLocaleNumber } from "services/gridFormater";

import { GetSpotsOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetSpotsOutputData>[] = [
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
        field: "city_name",
        headerName: "Ville",
        width: 200,
        type: "string",
        altType: "select",
        values: store.getState().global.citiesName,
        defaultValue: store.getState().global.citiesName[0]
    },
    {
        field: "name",
        headerName: "Nom",
        width: 200,
        type: "string"
    },
    {
        field: "address",
        headerName: "Adresse",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "nb_bikes",
        headerName: "N. vélo sur spot",
        width: 200,
        type: "number",
        renderCell: CellExpandRenderer
    },
    {
        field: "max_bikes",
        headerName: "Capacité du spot",
        width: 200,
        type: "number",
        renderCell: CellExpandRenderer
    },
    {
        field: "spot_coordinates",
        headerName: "Coordonnée",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer,
        filterable: false,
        editable: false
    },
    {
        field: "app_client",
        headerName: "App Client",
        width: 200,
        type: "boolean",
        renderCell: CellExpandRenderer,
        filterable: false,
        editable: false
    },
    {
        field: "app_tech",
        headerName: "App Tech",
        width: 200,
        type: "boolean",
        renderCell: CellExpandRenderer,
        filterable: false,
        editable: false
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

import {CellExpandRenderer} from "components/RenderCell/CellExpandRenderer";
import {AppGridColDef} from "models/interfaces/AppGridColDef";
import {formatLocalDateTime, formatNonLocaleNumber, formatTranslate} from "services/gridFormater";

import {GetAdminsOutputData} from "@bikairproject/shared";

export const columns: AppGridColDef<GetAdminsOutputData>[] = [
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
        field: "firstname",
        headerName: "Prénom",
        width: 200,
        type: "string"
    },
    {
        field: "lastname",
        headerName: "Nom",
        width: 200,
        type: "string"
    },
    {
        field: "email",
        headerName: "Couriel",
        width: 200,
        type: "string"
    },
    {
        field: "phone",
        headerName: "Téléphone",
        width: 150,
        type: "string"
    },
    {
        field: "role",
        headerName: "Role",
        width: 200,
        type: "string",
        valueFormatter: formatTranslate("roles.")
    },
    {
        field: "city_names_string",
        headerName: "Ville",
        width: 200,
        type: "string",
        filterable: false,
        renderCell: CellExpandRenderer
    },
    {
        field: "locale",
        headerName: "Langue",
        width: 100,
        type: "string",
        editable: false
    },
    {
        field: "username",
        headerName: "Username",
        width: 200,
        type: "string"
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
    {
        field: "password",
        headerName: "Mot de passe",
        width: 150,
        type: "string",
        editable: false,
        hide: true,
        create: true
    },
];

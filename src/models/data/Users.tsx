import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {
    formatLocalDateTime,
    formatNonLocaleNumber,
    formatStringArray,
    formatTranslate,
    styleBooleanCell
} from "services/gridFormater";

import { GetUsersOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetUsersOutputData>[] = [
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
        width: 150,
        type: "string"
    },
    {
        field: "lastname",
        headerName: "Nom",
        width: 150,
        type: "string"
    },
    {
        field: "phone",
        headerName: "Téléphone",
        width: 150,
        type: "string"
    },
    {
        field: "locale",
        headerName: "Langue",
        width: 100,
        type: "string"
    },
    {
        field: "otp",
        headerName: "Code à usage unique",
        width: 150,
        type: "string"
    },
    {
        field: "stripe_customer",
        headerName: "Utilisateur Stripe",
        width: 200,
        type: "string"
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
        type: "string"
    },
    {
        field: "deposit_status",
        headerName: "Cautions",
        width: 150,
        type: "string",
    },
    {
        field: "is_block",
        headerName: "Bloqué",
        width: 100,
        type: "boolean",
        cellClassName: styleBooleanCell
    },
    {
        field: "terms_accepted",
        headerName: "Termes Accepté",
        width: 200,
        type: "boolean",
        cellClassName: styleBooleanCell
    },
    {
        field: "city_name",
        headerName: "Ville",
        width: 200,
        type: "string"
    },
    {
        field: "birthdate",
        headerName: "Date de naissance",
        width: 200,
        type: "date"
    },
    {
        field: "code",
        headerName: "Code Parain",
        width: 150,
        type: "string"
    },
    {
        field: "used_codes",
        headerName: "Code Utilisé",
        width: 150,
        type: "string",
        filterable: false,
        valueFormatter: formatStringArray,
        renderCell: CellExpandRenderer
    },
    {
        field: "client_version",
        headerName: "Version du Client",
        width: 100,
        type: "string"
    },
    {
        field: "deposit_status",
        headerName: "Caution",
        width: 200,
        type: "string",
        filterable: false,
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

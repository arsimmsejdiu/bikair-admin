import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {
    formatLocalDateTime,
    formatNonLocaleNumber,
    formatTranslate,
} from "services/gridFormater";

import {Cautions} from "@bikairproject/shared";

export const columns: AppGridColDef<Cautions>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 300,
        editable: false,
        type: "string",
        valueFormatter: formatNonLocaleNumber
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
        field: "amount_drawn",
        headerName: "Montant prélevé",
        width: 200,
        type: "string"
    },
    {
        field: "payment_intent",
        headerName: "Payment Intent",
        width: 300,
        type: "string"
    },
    {
        field: "status",
        headerName: "Status",
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

import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {formatLocalDateTime, formatNonLocaleNumber, formatPriceEur, formatTranslate} from "services/gridFormater";

import {GetUserSubscriptionListOutputData} from "@bikairproject/shared";

export const columns:AppGridColDef<GetUserSubscriptionListOutputData>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "user_name",
        headerName: "Utilisateur",
        width: 150,
        type: "string"
    },
    {
        field: "user_id",
        headerName: "ID Utilisateur",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "city_name",
        headerName: "Ville",
        width: 150,
        editable: false,
        type: "string"
    },
    {
        field: "product_name",
        headerName: "Produit",
        width: 150,
        editable: false,
        type: "string"
    },
    {
        field: "product_price",
        headerName: "Prix",
        width: 100,
        type: "number",
        valueFormatter: formatPriceEur,
        editable: false
    },
    {
        field: "provider_subscription_id",
        headerName: "Stripe ID",
        width: 200,
        editable: false,
        type: "string"
    },
    {
        field: "status",
        headerName: "Statut",
        width: 100,
        type: "string",
        valueFormatter: formatTranslate("subscription_value.")
    },
    {
        field: "next_billing_date",
        headerName: "Prochaine Date De Facturation",
        width: 300,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
    {
        field: "canceled_note",
        headerName: "Note annulée",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "total_usage",
        headerName: "Utilisation",
        width: 100,
        type: "number"
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

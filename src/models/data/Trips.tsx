import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {
    formaterDateTimestamp,
    formatLocalDateTime,
    formatNonLocaleNumber,
    formatPriceEur,
    formatTranslate
} from "services/gridFormater";

import { GetTripsOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetTripsOutputData>[] = [
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
        field: "user_fullname",
        headerName: "Utilisateur",
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "booking_id",
        headerName: "ID Réservation",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "city_name",
        headerName: "Ville",
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "price",
        headerName: "Prix",
        width: 100,
        type: "number",
        valueFormatter: formatPriceEur,
        editable: false
    },
    {
        field: "discounted_amount",
        headerName: "Remise",
        width: 100,
        type: "number",
        valueFormatter: formatPriceEur,
        editable: false
    },
    {
        field: "refund_amount",
        headerName: "Remboursements",
        width: 200,
        type: "number",
        valueFormatter: formatPriceEur,
        editable: false
    },
    {
        field: "duration",
        headerName: "Durée",
        width: 100,
        type: "number",
        editable: false
    },
    {
        field: "status",
        headerName: "Statut",
        width: 150,
        type: "string",
        altType: "select",
        valueFormatter: formatTranslate("trip-status."),
        defaultValue: "OPEN"
    },
    // {field: "discount_code", headerName: "Code Réduction", width: 150, type: "string", editable: false},
    {
        field: "invoice",
        headerName: "Facture",
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "reference",
        headerName: "Référence",
        width: 150,
        type: "string",
        editable: false
    },
    {
        field: "payment_intent",
        headerName: "Payment Intent",
        width: 200,
        type: "string",
        editable: false
    },
    {
        field: "time_start",
        headerName: "Date départ",
        width: 200,
        valueFormatter: formaterDateTimestamp,
        type: "string",
        editable: false
    },
    {
        field: "time_end",
        headerName: "Date arrivée",
        width: 200,
        valueFormatter: formaterDateTimestamp,
        type: "string",
        editable: false
    },
    {
        field: "start_coords",
        headerName: "Coordonnées départ",
        width: 150,
        type: "string",
        filterable: false,
        editable: false
    },
    {
        field: "end_coords",
        headerName: "Coordonnées arrivée",
        width: 150,
        type: "string",
        filterable: false,
        editable: false
    },
    {
        field: "start_address",
        headerName: "Adresse départ",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer,
        editable: false
    },
    {
        field: "end_address",
        headerName: "Adresse arrivée",
        width: 200,
        type: "string",
        renderCell: CellExpandRenderer,
        editable: false
    },
    {
        field: "payment_method_id",
        headerName: "ID Moyen de paiement",
        width: 200,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "created_at",
        headerName: "Création",
        width: 150,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
    {
        field: "updated_at",
        headerName: "Modification",
        width: 150,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
];

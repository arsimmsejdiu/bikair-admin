import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { DiscountTypeValues } from "models/values/DiscountTypeValue";
import { StatusValues } from "models/values/StatusValues";
import {
    formatLocalDateTime,
    formatNonLocaleNumber,
    formatTranslate,
    styleBooleanCell
} from "services/gridFormater";

import {Discounts} from "@bikairproject/shared";

export const columns: AppGridColDef<Discounts>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "code",
        headerName: "Code",
        width: 100,
        type: "string",
        defaultValue: "CODE"
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
        type: "string",
        altType: "select",
        values: DiscountTypeValues,
        defaultValue: "ONE_SHOT",
        valueFormatter: formatTranslate("discount-values.")
    },
    {
        field: "value",
        headerName: "Valeur",
        width: 100,
        type: "number",
        defaultValue: 10
    },
    {
        field: "reusable",
        headerName: "Réutilisable",
        width: 100,
        type: "boolean",
        defaultValue: false,
        cellClassName: styleBooleanCell
    },
    {
        field: "expired_at",
        headerName: "Date Expiration",
        width: 100,
        type: "date"
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
        field: "priority",
        headerName: "Priorité",
        width: 100,
        type: "number",
        defaultValue: 0
    },
    {
        field: "created_at",
        headerName: "Date Création",
        width: 100,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
    {
        field: "updated_at",
        headerName: "Date Modification",
        width: 100,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
];

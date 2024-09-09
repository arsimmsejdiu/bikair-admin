import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import {formatLocalDateTime, formatNonLocaleNumber, formatTranslate} from "services/gridFormater";

import {MarketingCampaigns} from "@bikairproject/shared";

export const columns: AppGridColDef<MarketingCampaigns>[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
        type: "number",
        editable: false,
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "name",
        headerName: "Nom",
        width: 200,
        type: "string"
    },
    {
        field: "frequency",
        headerName: "Fréquence",
        width: 200,
        type: "string",
        filterable: false
    },
    {
        field: "title_fr",
        headerName: "Titre FR",
        width: 300,
        type: "string"
    },
    {
        field: "title_en",
        headerName: "Titre EN",
        width: 300,
        type: "string"
    },
    {
        field: "message_fr",
        headerName: "Message FR",
        width: 300,
        type: "string",
        renderCell: CellExpandRenderer,
    },
    {
        field: "message_en",
        headerName: "Message EN",
        width: 300,
        type: "string",
        renderCell: CellExpandRenderer,
    },
    {
        field: "status",
        headerName: "Statut",
        width: 200,
        type: "string",
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

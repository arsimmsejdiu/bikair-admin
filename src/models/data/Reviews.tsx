import { CellExpandRenderer } from "components/RenderCell/CellExpandRenderer";
import { RatingRenderer } from "components/RenderCell/RatingRenderer";
import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { formatLocalDateTime, formatNonLocaleNumber } from "services/gridFormater";

import { GetReviewsOutputData } from "@bikairproject/shared";

export const columns: AppGridColDef<GetReviewsOutputData>[] = [
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
        field: "user_id",
        headerName: "ID Utilisateur",
        width: 150,
        type: "number",
        valueFormatter: formatNonLocaleNumber
    },
    {
        field: "user_name",
        headerName: "Utilisateur",
        width: 200,
        type: "string"
    },
    {
        field: "bike_name",
        headerName: "Vélo",
        width: 150,
        type: "string"
    },
    {
        field: "city_name",
        headerName: "Ville",
        width: 200,
        type: "string"
    },
    {
        field: "comment",
        headerName: "Commentaire",
        width: 150,
        type: "string",
        renderCell: CellExpandRenderer
    },
    {
        field: "rate",
        headerName: "Note",
        width: 150,
        type: "number",
        renderCell: RatingRenderer
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
        width: 150,
        type: "dateTime",
        editable: false,
        valueFormatter: formatLocalDateTime
    },
];

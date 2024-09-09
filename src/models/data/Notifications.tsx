import { AppGridColDef } from "models/interfaces/AppGridColDef";
import { formatLocalDateTime, formatNonLocaleNumber } from "services/gridFormater";

import { Data } from "./Data";

export interface Notifications extends Data {
    id: number,
    uuid: string,
    title: string,
    message: string,
    topic: string,
    role?: string,
    created_at: Date,
    updated_at: Date,
}

export enum TopicTypeValues {
    INFORMATIONS = "INFORMATIONS",
    PROMOTIONS = "PROMOTIONS",
}

export enum RoleTypeValues {
    USER = "USER",
    ADMIN = "ADMIN",
}

export const columns: AppGridColDef<Notifications>[] = [
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
        field: "title",
        headerName: "Titre",
        width: 100,
        type: "string",
        defaultValue: ""
    },
    {
        field: "message",
        headerName: "Message",
        width: 100,
        type: "string",
        defaultValue: ""
    },
    {
        field: "topic",
        headerName: "Topic",
        width: 100,
        type: "string",
        altType: "select",
        values: Object.keys(TopicTypeValues),
        defaultValue: TopicTypeValues.INFORMATIONS
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
        type: "string",
        altType: "select",
        values: Object.keys(RoleTypeValues),
        defaultValue: RoleTypeValues.USER
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

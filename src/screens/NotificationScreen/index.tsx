import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import { columns, Notifications } from "models/data/Notifications";
import { FilterGrid } from "models/interfaces/FilterGrid";
import * as React from "react";
import { getNotifications } from "services/notifications";

const defaultFilter: FilterGrid = {
    limit: 100,
    offset: 0,
    orderBy: "id",
    order: "desc",
    value: null,
    operator: null,
    column: null,
    search: null,
    newValue: null,
    newOperator: null,
    newColumn: null,
    newSearch: null,
    newFilter: false,
};

const defaultActiveColumns: Record<GridRowId, boolean> = {
    "id": false,
    "uuid": false
};

export default function NotificationScreen () {

    const getSelectionId = (selection: Notifications | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Notifications"}
            basePath={"/notifications"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getNotifications}
            getSelectionId={getSelectionId}
        />
    );
}

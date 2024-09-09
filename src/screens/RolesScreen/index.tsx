import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Roles";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";
import {getRoles} from "services/roles";

import {ACCESS_RIGHTS, Roles} from "@bikairproject/shared";

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
    "uuid": false,
    "tracker_id": false,
    "battery_id": false,
    "lock_id": false
};

export default function BikesScreen() {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: Roles | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Roles"}
            basePath={"/roles"}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.RATES_WRITE)}
            create={!!user?.access_rights.includes(ACCESS_RIGHTS.RATES_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getRoles}
            getSelectionId={getSelectionId}
        />
    );
}

import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Bikes";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";
import {getBikes} from "services/bikes";

import {ACCESS_RIGHTS, GetBikesOutputData} from "@bikairproject/shared";

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

    const getSelectionId = (selection: GetBikesOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Vélos"}
            basePath={"/bikes"}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.BIKES_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getBikes}
            getSelectionId={getSelectionId}
        />
    );
}

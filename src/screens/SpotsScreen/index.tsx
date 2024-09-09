import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Spots";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";
import {getSpots} from "services/spots";

import {ACCESS_RIGHTS, GetSpotsOutputData} from "@bikairproject/shared";

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

export default function SpotsScreen() {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetSpotsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Spots"}
            basePath={"/spots"}
            create={!!user?.access_rights.includes(ACCESS_RIGHTS.SPOTS_WRITE)}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.SPOTS_READ)}
            upload={!!user?.access_rights.includes(ACCESS_RIGHTS.SPOTS_WRITE)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getSpots}
            getSelectionId={getSelectionId}
        />
    );
}

import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/CityRedZones";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";

import {getCityRedZones} from "../../services/cities";
import {ACCESS_RIGHTS, GetCityRedZonesOutputData} from "@bikairproject/shared";

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

export default function RedZoneScreen() {
    const userRedZone = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetCityRedZonesOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Red Zones"}
            basePath={"/red-zones"}
            create={!!userRedZone?.access_rights.includes(ACCESS_RIGHTS.RED_ZONE_WRITE)}
            detail={!!userRedZone?.access_rights.includes(ACCESS_RIGHTS.RED_ZONE_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getCityRedZones}
            getSelectionId={getSelectionId}
        />
    );
}

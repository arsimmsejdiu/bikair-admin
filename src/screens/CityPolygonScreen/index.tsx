import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/CityPolygon";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";

import {getCityPolygons} from "../../services/cities";
import {ACCESS_RIGHTS, GetCityPolygonsOutputData} from "@bikairproject/shared";

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

export default function CityPolygonScreen() {
    const userRedZone = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetCityPolygonsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"City Polygon"}
            basePath={"/city-polygon"}
            create={!!userRedZone?.access_rights.includes(ACCESS_RIGHTS.POLYGON_WRITE)}
            detail={!!userRedZone?.access_rights.includes(ACCESS_RIGHTS.POLYGON_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getCityPolygons}
            getSelectionId={getSelectionId}
        />
    );
}

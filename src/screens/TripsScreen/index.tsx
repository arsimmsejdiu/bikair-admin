import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Trips";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";
import {getTrips} from "services/trips";

import {ACCESS_RIGHTS,GetTripsOutputData} from "@bikairproject/shared";

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
    "booking_id": false,
    "payment_method_id": false,
    "invoice": false,
    "reference": false,
    "payment_intent": false,
    "trip_deposit_id": false
};

export default function TripsScreen() {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetTripsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Trajets"}
            basePath={"/trips"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getTrips}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.TRIPS_READ)}
            getSelectionId={getSelectionId}
        />
    );
}

import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import { columns } from "models/data/Admins";
import { FilterGrid } from "models/interfaces/FilterGrid";
import * as React from "react";
import { getAdmins } from "services/admins";

import {ACCESS_RIGHTS, GetAdminsOutputData} from "@bikairproject/shared";

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
    "password": false
};

export default function AdminsScreen () {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetAdminsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Admins"}
            basePath={"/admins"}
            create={!!user?.access_rights.includes(ACCESS_RIGHTS.ADMINS_WRITE)}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.ADMINS_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getAdmins}
            getSelectionId={getSelectionId}
        />
    );
}

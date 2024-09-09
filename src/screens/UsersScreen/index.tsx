import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Users";
import {FilterGrid} from "models/interfaces/FilterGrid";
import * as React from "react";
import {getUsers} from "services/users";

import {ACCESS_RIGHTS, GetUsersOutputData} from "@bikairproject/shared";

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

export default function UsersScreen() {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: GetUsersOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Utilisateurs"}
            basePath={"/users"}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.USERS_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getUsers}
            getSelectionId={getSelectionId}
        />
    );
}

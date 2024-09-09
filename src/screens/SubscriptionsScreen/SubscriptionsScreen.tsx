import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import { columns } from "models/data/Subscriptions";
import { FilterGrid } from "models/interfaces/FilterGrid";
import React from "react";
import {getSubscriptionList} from "services/Subscriptions";

import {ACCESS_RIGHTS, UserSubscriptions} from "@bikairproject/shared";

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
    "user_id": false,
};
const SubscriptionsScreen = () => {
    const user = useAppSelector(state => state.global.me);
    const getSelectionId = (selection: UserSubscriptions| null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Pass & Abonnement"}
            basePath={"/subscriptions"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getSubscriptionList}
            getSelectionId={getSelectionId}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.SUBSCRIPTIONS_READ)}
        />
    );
};

export default SubscriptionsScreen;

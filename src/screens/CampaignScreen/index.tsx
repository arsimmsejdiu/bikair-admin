import {GridRowId} from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import {columns} from "models/data/Marketings";
import {FilterGrid} from "models/interfaces/FilterGrid";
import React from "react";
import {getMarketingList} from "services/marketing";

import {ACCESS_RIGHTS, MarketingCampaigns} from "@bikairproject/shared";

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
};

export const CampaignScreen = () => {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: MarketingCampaigns | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Marketing"}
            basePath={"/marketings"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getMarketingList}
            getSelectionId={getSelectionId}
            create={!!user?.access_rights.includes(ACCESS_RIGHTS.MARKETINGS_WRITE)}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.MARKETINGS_READ)}
        />
    );
};

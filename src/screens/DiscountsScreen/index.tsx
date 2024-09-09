import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import {useAppSelector} from "hooks/useAppSelector";
import { columns } from "models/data/Discounts";
import { FilterGrid } from "models/interfaces/FilterGrid";
import * as React from "react";
import { getDiscounts } from "services/discounts";

import {ACCESS_RIGHTS, Discounts} from "@bikairproject/shared";

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
    "id": false
};

export default function DiscountsScreen () {
    const user = useAppSelector(state => state.global.me);

    const getSelectionId = (selection: Discounts | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Promotions"}
            basePath={"/discounts"}
            create={!!user?.access_rights.includes(ACCESS_RIGHTS.DISCOUNTS_WRITE)}
            detail={!!user?.access_rights.includes(ACCESS_RIGHTS.DISCOUNTS_READ)}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getDiscounts}
            getSelectionId={getSelectionId}
        />
    );
}

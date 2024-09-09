import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import { columns } from "models/data/Cautions";
import { FilterGrid } from "models/interfaces/FilterGrid";
import React, {memo} from "react";
import {getDeposits} from "services/deposits";

import {Cautions} from "@bikairproject/shared";

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


const CautionsScreen = () => {
    const getSelectionId = (selection: Cautions | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Cautions"}
            basePath={"/cautions"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getDeposits}
            getSelectionId={getSelectionId}
        />
    );
};

export default memo(CautionsScreen);

import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import { columns } from "models/data/Reports";
import { FilterGrid } from "models/interfaces/FilterGrid";
import * as React from "react";
import { getReports } from "services/reports";

import { GetReportsOutputData } from "@bikairproject/shared/dist/interfaces/reports/get-reports/GetReportsOutput";

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
};

export default function ReportsScreen () {

    const getSelectionId = (selection: GetReportsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Rapports"}
            basePath={"/reports"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getReports}
            getSelectionId={getSelectionId}
        />
    );
}

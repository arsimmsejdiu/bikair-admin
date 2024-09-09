import { GridRowId } from "@mui/x-data-grid/models";
import DataTable from "components/DataTable";
import { columns } from "models/data/Reviews";
import { FilterGrid } from "models/interfaces/FilterGrid";
import * as React from "react";
import { getReviews } from "services/reviews";

import { GetReviewsOutputData } from "@bikairproject/shared/dist/interfaces/reviews/get-reviews/GetReviewsOutput";

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
    "user_id": false
};

export default function ReviewsScreen () {

    const getSelectionId = (selection: GetReviewsOutputData | null) => {
        return selection?.id ?? null;
    };

    return (
        <DataTable
            title={"Notes"}
            basePath={"/reviews"}
            columns={columns}
            defaultFilter={defaultFilter}
            defaultActiveColumns={defaultActiveColumns}
            getData={getReviews}
            getSelectionId={getSelectionId}
        />
    );
}

import {GridRowId} from "@mui/x-data-grid/models";
import {GET_REVIEWS_LIST} from "config/endpoints";
import {columns} from "models/data/Reviews";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GetReviewsOutput} from "@bikairproject/shared";

export const getReviews = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetReviewsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns),
        };
        console.log(config);
        const response = await instanceApi.get<GetReviewsOutput>(
            GET_REVIEWS_LIST,
            config
        );
        console.log(response.data.rows[0]);
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
        return {
            offset: Number(filterData.offset),
            limit: Number(filterData.limit),
            rows: [],
            total: 0,
        };
    }
};

import { GridRowId } from "@mui/x-data-grid/models";
import { GET_LAST_REPORT, GET_LAST_REVIEW, GET_REPORTS_LIST } from "config/endpoints";
import { LastReport } from "models/data/LastReport";
import { columns } from "models/data/Reports";
import { FilterData } from "models/interfaces/FilterData";
import { transformFilterData } from "services/dataFilterUtils";
import { instanceApi } from "services/http";

import { GetBikeReviewOutput, GetReportsOutput } from "@bikairproject/shared";

export const getReports = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetReportsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetReportsOutput>(GET_REPORTS_LIST, config);
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return {
            offset: Number(filterData.offset),
            limit: Number(filterData.limit),
            rows: [],
            total: 0
        };
    }
};

export const getLastReport = async (bikeId: number | string) => {
    try {
        const { data } = await instanceApi.get<LastReport>(GET_LAST_REPORT(bikeId));
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getLastReview = async (bikeId: number | string) => {
    try {
        const { data } = await instanceApi.get<GetBikeReviewOutput>(GET_LAST_REVIEW(bikeId));
        return data;
    } catch (err) {
        console.log(err);
    }
};

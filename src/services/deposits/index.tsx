import {GridRowId} from "@mui/x-data-grid/models";
import {GET_DEPOSITS} from "config/endpoints";
import {columns} from "models/data/Cautions";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GetCautionsOutput} from "@bikairproject/shared";

export const getDeposits = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetCautionsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns),
        };
        const response = await instanceApi.get<GetCautionsOutput>(GET_DEPOSITS, config);
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

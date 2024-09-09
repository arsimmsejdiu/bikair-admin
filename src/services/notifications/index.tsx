import {GridRowId} from "@mui/x-data-grid/models";
import {GET_NOTIFICATIONS, POST_NOTIFICATIONS} from "config/endpoints";
import {columns, Notifications} from "models/data/Notifications";
import {FilterData} from "models/interfaces/FilterData";
import {SingleResponse} from "models/interfaces/SingleResponse";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";
import {getDefaultObject} from "services/utils";

import {DataQueryResult} from "@bikairproject/shared";

export const getNotifications = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<DataQueryResult<Notifications>> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<DataQueryResult<Notifications>>(GET_NOTIFICATIONS, config);
        return response.data;
    } catch (error: any) {
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

export const createNotification = async (notification: Notifications): Promise<Notifications> => {
    try {
        const response = await instanceApi.post<SingleResponse<Notifications>>(POST_NOTIFICATIONS, notification);
        return response.data.rows;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return getDefaultObject<Notifications>(columns);
    }
};

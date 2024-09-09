import {GridRowId} from "@mui/x-data-grid/models";
import {GET_USER_DETAIL, GET_USERS_LIST, PUT_USER_DETAIL} from "config/endpoints";
import {columns} from "models/data/Users";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GetUserDetailOutput, GetUsersOutput} from "@bikairproject/shared";

export const getUsers = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetUsersOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetUsersOutput>(GET_USERS_LIST, config);
        return response.data;
    } catch (error: any) {
        if (error.response?.status) {
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

export const getUserDetail = async (userId: string): Promise<GetUserDetailOutput | null> => {
    try {
        const {data} = await instanceApi.get<GetUserDetailOutput>(GET_USER_DETAIL(userId));
        return data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        } else {
            return null;
        }
    }
};


export const updateUserDetail = async (userId: string, body: any): Promise<void> => {
    await instanceApi.put(PUT_USER_DETAIL(userId), body);
};

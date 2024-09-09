import {GridRowId} from "@mui/x-data-grid/models";
import {DELETE_ADMIN, GET_ADMIN, GET_ADMINS_LIST, GET_ADMINS_ME, POST_ADMIN, PUT_ADMIN} from "config/endpoints";
import {columns} from "models/data/Admins";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {
    GetAdminMeOutput,
    GetAdminOutput,
    GetAdminsOutput,
    PostAdminsInput,
    PostAdminsOutput,
    PutAdminsInput,
    PutAdminsOutput
} from "@bikairproject/shared";

export const getAdmins = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetAdminsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetAdminsOutput>(GET_ADMINS_LIST, config);
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
export const getAdmin = async (adminId: number): Promise<GetAdminOutput | null> => {
    try {
        const response = await instanceApi.get<GetAdminOutput>(GET_ADMIN(adminId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const createAdmin = async (admin: PostAdminsInput): Promise<PostAdminsOutput | null> => {
    try {
        const response = await instanceApi.post<PostAdminsOutput>(POST_ADMIN, admin);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const updateAdmin = async (admin: PutAdminsInput): Promise<PutAdminsOutput | null> => {
    try {
        const response = await instanceApi.put<PutAdminsOutput>(PUT_ADMIN, admin);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const deleteAdmin = async (adminId: number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_ADMIN(adminId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

export const getMe = async (): Promise<GetAdminMeOutput | null> => {
    const response = await instanceApi.get<GetAdminMeOutput>(GET_ADMINS_ME);
    return response.data;
};

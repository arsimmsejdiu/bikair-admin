import {GridRowId} from "@mui/x-data-grid/models";
import {AxiosRequestConfig} from "axios";
import {columns} from "models/data/Roles";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {DELETE_ROLE, GET_ACCESS_RIGHTS, GET_ROLE, GET_ROLES, POST_ROLES, PUT_ROLES,} from "../../config/endpoints";
import {GetAccessRightsOutput, GetRolesOutput, Roles, RolesCreate, RolesUpdate} from "@bikairproject/shared";

export const getRoles = async (
    filterData: FilterData | null,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetRolesOutput> => {
    try {
        const config: AxiosRequestConfig = {};
        if (filterData !== null) {
            config.params = transformFilterData(filterData, columns, activeColumns);
        }
        const response = await instanceApi.get<GetRolesOutput>(GET_ROLES, config);
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        } else {
            return {
                offset: Number(filterData ? filterData.offset : 0),
                limit: Number(filterData ? filterData.limit : 100),
                rows: [],
                total: 0
            };
        }
    }
};

export const getAccessRights = async (
    filterData: FilterData | null,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetAccessRightsOutput> => {
    try {
        const config: AxiosRequestConfig = {};
        if (filterData !== null) {
            config.params = transformFilterData(filterData, columns, activeColumns);
        }
        const response = await instanceApi.get<GetAccessRightsOutput>(GET_ACCESS_RIGHTS, config);
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        } else {
            return {
                offset: Number(filterData ? filterData.offset : 0),
                limit: Number(filterData ? filterData.limit : 100),
                rows: [],
                total: 0
            };
        }
    }
};


export const getRole = async (roleId: number): Promise<Roles | null> => {
    try {
        const response = await instanceApi.get<Roles>(GET_ROLE(roleId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const createRole = async (role: RolesCreate): Promise<Roles | null> => {
    try {
        const response = await instanceApi.post<Roles>(POST_ROLES, role);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const updateRole = async (role: RolesUpdate): Promise<Roles | null> => {
    try {
        const response = await instanceApi.put<Roles>(PUT_ROLES, role);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const deleteRole = async (roleId: number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_ROLE(roleId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

import {GridRowId} from "@mui/x-data-grid/models";
import {DELETE_SPOT, GET_SPOT, GET_SPOTS_LIST, GET_SPOTS_MARKER_DATA, POST_SPOT, PUT_SPOT} from "config/endpoints";
import {columns} from "models/data/Spots";
import {Spot} from "models/dto/Spot";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GetSpotsNearbyOutput, GetSpotsOutput} from "@bikairproject/shared";

export const getSpots = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetSpotsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetSpotsOutput>(GET_SPOTS_LIST, config);
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

export const createSpot = async (spot: Spot): Promise<Spot> => {
    try {
        const response = await instanceApi.post<Spot>(POST_SPOT, spot);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return {};
    }
};

export const updateSpot = async (spot: Spot): Promise<Spot> => {
    try {
        const response = await instanceApi.put<Spot>(PUT_SPOT, spot);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return {};
    }
};

export const getSpot = async (spotId: number): Promise<Spot> => {
    try {
        const response = await instanceApi.get<Spot>(GET_SPOT(spotId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return {};
    }
};

export const deleteSpot = async (spotId: number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_SPOT(spotId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

export const getSpotMarkerData = async (lastUpdate?: number | null): Promise<GetSpotsNearbyOutput> => {
    try {
        const config = {
            params: {
                lastUpdate: lastUpdate
            }
        };
        const response = await instanceApi.get<GetSpotsNearbyOutput>(GET_SPOTS_MARKER_DATA, config);
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
        return {
            rows: [],
            total: 0,
        };
    }
};

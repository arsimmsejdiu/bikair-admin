import {GridRowId} from "@mui/x-data-grid/models";
import {
    GET_BIKE_DETAIL,
    GET_BIKE_MARKER_DATA,
    GET_BIKES_LIST,
    GET_BIKES_POSITION,
    PUT_BIKE,
    PUT_BIKES_ADDRESS,
} from "config/endpoints";
import {columns} from "models/data/Bikes";
import {Bike} from "models/dto/Bike";
import {BikePositionHistory} from "models/dto/BikePositionHistory";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GetBikeDetailOutput, GetBikesOutput, GetBikesTechnicianOutput} from "@bikairproject/shared";

export const getBikes = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetBikesOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns),
        };
        const response = await instanceApi.get<GetBikesOutput>(
            GET_BIKES_LIST,
            config
        );
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

export const getBikeMarkerData = async (
    lastUpdate: number | null
): Promise<GetBikesTechnicianOutput> => {
    try {
        const config = {
            params: {
                lastUpdate: lastUpdate,
            },
        };
        const response = await instanceApi.get<GetBikesTechnicianOutput>(
            GET_BIKE_MARKER_DATA,
            config
        );
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
        return {
            rows: [],
            total: 0,
            lastUpdate: null,
        };
    }
};

export const getBikeDetail = async (bikeId: string): Promise<GetBikeDetailOutput | null> => {
    try {
        const response = await instanceApi.get<GetBikeDetailOutput>(GET_BIKE_DETAIL(bikeId));
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        } else {
            return null;
        }
    }
};

export const getBikeHistory = async (bikeId: string): Promise<BikePositionHistory[]> => {
    try {
        const response = await instanceApi.get<BikePositionHistory[]>(GET_BIKES_POSITION(bikeId));
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
        return [];
    }
};

export const updateBike = async (bike: Bike): Promise<any> => {
    try {
        const response = await instanceApi.put<Bike>(PUT_BIKE, bike);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

export const putBikeAddress = async (bikeId: number): Promise<any> => {
    try {
        const response = await instanceApi.put<any>(PUT_BIKES_ADDRESS(bikeId));
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
    }
};

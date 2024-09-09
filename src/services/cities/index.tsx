import {GridRowId} from "@mui/x-data-grid/models";
import {AxiosRequestConfig} from "axios";
import {
    DELETE_CITY_POLYGON,
    DELETE_CITY_RED_ZONE,
    GET_CITIES,
    GET_CITIES_POLYGONS,
    GET_CITIES_RED_ZONES,
    GET_CITY_POLYGON,
    GET_CITY_RED_ZONE,
    POST_CITY_POLYGON,
    POST_CITY_RED_ZONE
} from "config/endpoints";
import {columns} from "models/data/Users";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {CityPolygon} from "../../models/dto/CityPolygon";
import {RedZone} from "../../models/dto/RedZone";
import {
    GetCitiesOutput, GetCityPolygonOutput,
    GetCityPolygonsOutput,
    GetCityPolygonsOutputData,
    GetCityRedZoneOutput,
    GetCityRedZonesOutput,
    GetCityRedZonesOutputData, PostCreateCityPolygonInput,
    PostCreateCityRedZoneInput
} from "@bikairproject/shared";

export const getCities = async (
    filterData: FilterData | null,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetCitiesOutput> => {
    try {
        const config: AxiosRequestConfig = {};
        if (filterData !== null) {
            config.params = transformFilterData(filterData, columns, activeColumns);
        }
        const response = await instanceApi.get<GetCitiesOutput>(GET_CITIES, config);
        return response.data;
    } catch (error: any) {
        if (error.response?.status) {
            throw error;
        }
        return {
            offset: Number(filterData ? filterData.offset : 0),
            limit: Number(filterData ? filterData.limit : 100),
            rows: [],
            total: 0
        };
    }
};

export const getCityPolygons = async (
    filterData: FilterData | null,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetCityPolygonsOutput> => {
    try {
        const config: AxiosRequestConfig = {};
        if (filterData !== null) {
            config.params = transformFilterData(filterData, columns, activeColumns);
        }
        const response = await instanceApi.get<GetCityPolygonsOutput>(GET_CITIES_POLYGONS, config);
        return response.data;
    } catch (error: any) {
        if (error.response?.status) {
            throw error;
        }
        return {
            offset: Number(filterData ? filterData.offset : 0),
            limit: Number(filterData ? filterData.limit : 100),
            rows: [],
            total: 0
        };
    }
};

export const getCityRedZones = async (
    filterData: FilterData | null,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetCityRedZonesOutput> => {
    try {
        const config: AxiosRequestConfig = {};
        if (filterData !== null) {
            config.params = transformFilterData(filterData, columns, activeColumns);
        }
        const response = await instanceApi.get<GetCityRedZonesOutput>(GET_CITIES_RED_ZONES, config);
        return response.data;
    } catch (error: any) {
        if (error.response?.status) {
            throw error;
        }
        return {
            offset: Number(filterData ? filterData.offset : 0),
            limit: Number(filterData ? filterData.limit : 100),
            rows: [],
            total: 0
        };
    }
};

export const getCitiesPolygon = async (): Promise<GetCityPolygonsOutputData[]> => {
    try {
        const response = await instanceApi.get<GetCityPolygonsOutput>(GET_CITIES_POLYGONS);
        return response.data.rows;
    } catch (error: any) {
        if (error.response?.status) {
            throw error;
        }
        return [];
    }
};

export const getCitiesRedZones = async (): Promise<GetCityRedZonesOutputData[]> => {
    try {
        const response = await instanceApi.get<GetCityRedZonesOutput>(GET_CITIES_RED_ZONES);
        return response.data.rows;
    } catch (error: any) {
        if (error.response?.status) {
            throw error;
        }
        return [];
    }
};

export const createCityRedZone = async (redZone: RedZone): Promise<PostCreateCityRedZoneInput | null> => {
    try {
        const response = await instanceApi.post<PostCreateCityRedZoneInput>(POST_CITY_RED_ZONE, redZone);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const createCityPolygon = async (cityPolygon: CityPolygon): Promise<PostCreateCityPolygonInput | null> => {
    try {
        const response = await instanceApi.post<PostCreateCityPolygonInput>(POST_CITY_POLYGON, cityPolygon);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const getCityRedZone = async (redZoneId: string | number): Promise<GetCityRedZoneOutput | null> => {
    try {
        const response = await instanceApi.get<GetCityRedZoneOutput>(GET_CITY_RED_ZONE(redZoneId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const getCityPolygon = async (cityPolygonId: string | number): Promise<GetCityPolygonOutput | null> => {
    try {
        const response = await instanceApi.get<GetCityPolygonOutput>(GET_CITY_POLYGON(cityPolygonId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const deleteCityRedZone = async (redZoneId: string | number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_CITY_RED_ZONE(redZoneId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};
export const deleteCityPolygon = async (cityPolygonId: string | number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_CITY_POLYGON(cityPolygonId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};


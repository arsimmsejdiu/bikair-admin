import {GridRowId} from "@mui/x-data-grid/models";
import {
    FORCE_END_TRIP,
    GET_TRIP_DETAILS,
    GET_TRIPS_END_COORDS,
    GET_TRIPS_LIST,
    GET_TRIPS_START_COORDS,
    PUT_TRIP
} from "config/endpoints";
import {columns} from "models/data/Trips";
import {Coordinates} from "models/dto/Coordinates";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {
    GetTripDetailsOutput,
    GetTripsOutput,
    PutEndTripForceInput,
    PutEndTripForceOutput,
    PutTripsInput,
    PutTripsOutput,
} from "@bikairproject/shared";

export const getTrips = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetTripsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetTripsOutput>(GET_TRIPS_LIST, config);
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

export const getTripEndCoordsData = async (): Promise<Coordinates[]> => {
    try {
        const response = await instanceApi.get<Coordinates[]>(GET_TRIPS_END_COORDS);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return [];
    }
};

export const getTripStartCoordsData = async (): Promise<Coordinates[]> => {
    try {
        const response = await instanceApi.get<Coordinates[]>(GET_TRIPS_START_COORDS);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return [];
    }
};

export const getTripDetails = async (tripId: number): Promise<GetTripDetailsOutput | null> => {
    try {
        const response = await instanceApi.get<GetTripDetailsOutput>(GET_TRIP_DETAILS(tripId));
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const getTripsStatuses = async (tripId: number): Promise<{ status: string, created_at: Date }[]> => {
    try {
        //const response = await instanceApi.get<Coordinates[]>(GET_TRIPS_START_COORDS);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {status: "BEGIN", created_at: new Date()},
                    {status: "START", created_at: new Date()},
                    {status: "OPEN", created_at: new Date()},
                    {status: "CLOSED", created_at: new Date()},
                    {status: "PAYMENT_INV_CREATED", created_at: new Date()},
                    {status: "PAYMENT_SUCCESS", created_at: new Date()}
                ]);
            }, 3000);
        });
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return [];
    }
};

export const putForceEndTrip = async (trip: PutEndTripForceInput): Promise<PutEndTripForceOutput> => {
    try {
        const response = await instanceApi.put<PutEndTripForceOutput>(FORCE_END_TRIP, trip);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return {};
    }
};

export const updateTripStatus = async (status: PutTripsInput): Promise<PutTripsOutput | null> => {
    try {
        const response = await instanceApi.put<PutTripsOutput>(PUT_TRIP, status);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

import {GET_OPEN_APP_COORDS, GET_USER_EVENT_LOGS} from "config/endpoints";
import {Coordinates} from "models/dto/Coordinates";
import {instanceApi} from "services/http";

import {GetUserEventLogsOutputData} from "@bikairproject/shared";

export const getOpenCoordsData = async (): Promise<Coordinates[]> => {
    try {
        const response = await instanceApi.get<Coordinates[]>(GET_OPEN_APP_COORDS);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return [];
    }
};

export const getUserEventLogs = async (userId: string): Promise<GetUserEventLogsOutputData[]> => {
    try {
        const {data} = await instanceApi.get<GetUserEventLogsOutputData[]>(GET_USER_EVENT_LOGS(userId));
        return data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        } else {
            return [];
        }
    }
};

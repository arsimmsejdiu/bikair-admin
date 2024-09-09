import { BIKE_STATUS, BikeStatusType } from "@bikairproject/shared";

export const BikeStatusValues: BikeStatusType[] = [
    BIKE_STATUS.AVAILABLE,
    BIKE_STATUS.USED,
    BIKE_STATUS.BOOKED,
    BIKE_STATUS.MAINTENANCE,
    BIKE_STATUS.STOLEN,
    BIKE_STATUS.PREPARATION,
    BIKE_STATUS.REMOVED,
    BIKE_STATUS.DAMAGED,
    BIKE_STATUS.INCIDENT,
    BIKE_STATUS.NOT_FOUND,
    BIKE_STATUS.WAIT_DEPLOY,
    BIKE_STATUS.RENTAL
];

export type BikeFilterStatus = BikeStatusType | "ALL"
export const BikeFilterStatusValues: BikeFilterStatus[] = ["ALL", ...BikeStatusValues];
export type BikeFilterStatusRecord = Record<BikeFilterStatus, boolean | undefined>

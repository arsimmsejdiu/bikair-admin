import { BikeStatusType, BikeTagType } from "@bikairproject/shared";

export interface Bike {
    id?: number,
    uuid?: string,
    name?: string,
    tags?: BikeTagType[],
    status?: BikeStatusType,
    address?: string | null,
    city_name?: string | null,
    created_at?: string,
    updated_at?: string,
}

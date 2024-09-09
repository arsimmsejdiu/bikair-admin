import { BIKE_TAGS, BikeTagType } from "@bikairproject/shared";

export const BikeTagValues: BikeTagType[] = [
    BIKE_TAGS.PRIORITY,
    BIKE_TAGS.WORKSHOP,
    BIKE_TAGS.TO_SPOT,
    BIKE_TAGS.CONTROL,
    BIKE_TAGS.COLLECT,
    BIKE_TAGS.CONTROLLED,
    BIKE_TAGS.COLLECTED,
    BIKE_TAGS.BATTERY_LOW,
    BIKE_TAGS.CLIENT_REVIEW
];

export type BikeFilterTags = BikeTagType | "ALL"
export const BikeFilterTagsValues: BikeFilterTags[] = ["ALL", ...BikeTagValues];
export type BikeFilterTagsRecord = Record<BikeFilterTags, boolean | undefined>

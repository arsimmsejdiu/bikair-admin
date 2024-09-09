import {RecurenceData} from "models/dto/RecurenceData";
import {AppGridColDef} from "models/interfaces/AppGridColDef";

import {DateUtils} from "@bikairproject/utils";

export const getDefaultObject = <T extends object>(appGridColDefs: AppGridColDef<T>[]) => {
    const result: Partial<T> = {};
    for (const appGridColDef of appGridColDefs) {
        const isUndefined = typeof appGridColDef.defaultValue === "undefined";
        result[appGridColDef.field] = isUndefined ? null : appGridColDef.defaultValue;
    }
    return result as T;
};

export const diffTimestamp = (before: number | Date, after: number | Date) => {
    const beforeTmsp = typeof before !== "number" ? before.getTime() : before;
    const afterTmsp = typeof after !== "number" ? after.getTime() : after;
    const diffMs = (afterTmsp - beforeTmsp); // milliseconds between now & Christmas
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return {
        diffDays,
        diffHrs,
        diffMins
    };
};

export const invertCoordinates = (coordinates: any) => {
    if (Array.isArray(coordinates)) {
        if (coordinates.length === 2 && !Array.isArray(coordinates[0])) {
            return [coordinates[1], coordinates[0]];
        }
        for (let i = 0; i < coordinates.length; i++) {
            coordinates[i] = invertCoordinates(coordinates[i]);
        }
    }
    return coordinates;
};

export const formatTimestamp = (date: Date | null | undefined): string | null => {
    if (date) {
        return DateUtils.toLocaleDateTimeString(date);
    } else {
        return null;
    }
};
export const formatDateTimestamp = (date: Date | null | undefined): string | null => {
    if (date) {
        return DateUtils.toLocaleDateString(date);
    } else {
        return null;
    }
};
export const formatHourTimestamp = (date: Date | null | undefined): string | null => {
    if (date) {
        return DateUtils.toLocaleTimeString(date);
    } else {
        return null;
    }
};

export const formatPriceWithLocal = (total: number, locale = "fr") => {
    const price = locale === "fr" ?
        (total / 100).toFixed(2).replace(".", ",") :
        (total / 100).toFixed(2);
    return  price + "€";
};

export function arraysEqual<T>(a: T[], b: T[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export const createCronExpression = (data: RecurenceData) => {
    const timeShift = DateUtils.getTimeShift(new Date());
    const shiftedHour = data.hour - timeShift;
    let cronExpression: string;
    if (data.repetition) {
        cronExpression = `${data.minute} ${shiftedHour} ? * ${data.dayOfWeek} *`;
    } else {
        cronExpression = `${data.minute} ${shiftedHour} ${data.dayOfMonth} ${data.month} ? ${data.year}`;
    }
    console.log("Cron Expression --> ", `cron(${cronExpression})`);
    return `cron(${cronExpression})`;
};

export const createRecurenceData = (cron: string | undefined | null) => {
    let data: RecurenceData;
    if (typeof cron === "undefined" || cron === null) {
        data = {
            repetition: false,
            year: 2023,
            month: "JAN",
            dayOfWeek: [],
            dayOfMonth: 1,
            hour: 12,
            minute: 30
        };
    } else {
        const cleanedCron = cron.substring(0, cron.length - 1).substring(5);
        console.log("cleanedCron = ", cleanedCron);
        const splits = cleanedCron.split(" ");
        const timeShift = DateUtils.getTimeShift(new Date());
        if (splits[2] === "?") {
            data = {
                repetition: true,
                year: null,
                month: null,
                dayOfMonth: null,
                dayOfWeek: splits[4].split(","),
                hour: Number(splits[1]) + timeShift,
                minute: Number(splits[0])
            };
        } else {
            data = {
                repetition: false,
                year: Number(splits[5]),
                month: splits[3],
                dayOfMonth: Number(splits[2]),
                dayOfWeek: [],
                hour: Number(splits[1]) + timeShift,
                minute: Number(splits[0])
            };
        }
    }
    console.log("data --> ", data);
    return data;
};

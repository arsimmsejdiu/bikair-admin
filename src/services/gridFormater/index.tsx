import {GridCellParams, GridValueFormatterParams} from "@mui/x-data-grid";
import clsx from "clsx";
import i18n from "i18next";
import {formatDateTimestamp, formatHourTimestamp, formatTimestamp} from "services/utils";

import {formatPrice} from "@bikairproject/utils";

export const formatLocalDateTime = (params: GridValueFormatterParams<string>): string | null => {
    if (params.value) {
        const date = new Date(params.value);
        return formatTimestamp(date);
    } else {
        return null;
    }
};

export const formaterTimestamp = (params: GridValueFormatterParams<number>): string | null => {
    if (params.value) {
        const date = new Date(Number(params.value));
        return formatTimestamp(date);
    } else {
        return null;
    }
};
export const formaterDateTimestamp = (params: GridValueFormatterParams<number>): string | null => {
    if (params.value) {
        const date = new Date(Number(params.value));
        return formatDateTimestamp(date);
    } else {
        return null;
    }
};
export const formaterHourTimestamp = (params: GridValueFormatterParams<number>): string | null => {
    if (params.value) {
        const date = new Date(Number(params.value));
        return formatHourTimestamp(date);
    } else {
        return null;
    }
};

export const formatPriceEur = (params: GridValueFormatterParams): string | null => {
    return formatPrice(params.value);
};

export const formatStringArray = (params: GridValueFormatterParams): string | null => {
    let result = null;
    if (typeof params.value !== "undefined" && params.value !== null) {
        const array = params.value as string[];
        if (array.length > 0) {
            result = array[0];
            for (let i = 1; i < array.length; i++) {
                result += `, ${array[i]}`;
            }
        }
    }
    return result;
};

export const styleBooleanCell = (params: GridCellParams<boolean>): string => {
    return clsx("bikair-grid-cell-boolean", {
        negative: !params.value,
        positive: params.value,
    });
};

export const formatNonLocaleNumber = (params: GridValueFormatterParams): number | null => {
    return !params.value ? null : parseInt(`${params.value}`);
};

export const formatTranslate = (translatePrefix: string) => (params: GridValueFormatterParams): string | null => {
    if (typeof params.value === "undefined" || params.value === null) {
        return "";
    }
    if (Array.isArray(params.value)) {
        const array = params.value as string[];
        if (array.length === 0) {
            return "";
        }
        let result = i18n.t(translatePrefix + array[0]);
        for (let i = 1; i < array.length; i++) {
            result += `, ${i18n.t(translatePrefix + array[1])}`;
        }
        return result;
    } else {
        return i18n.t(translatePrefix + params.value);
    }

};

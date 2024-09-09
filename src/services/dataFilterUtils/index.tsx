import {GridFilterModel} from "@mui/x-data-grid";
import {GridRowId} from "@mui/x-data-grid/models";
import {AppGridColDef} from "models/interfaces/AppGridColDef";
import {FilterData} from "models/interfaces/FilterData";
import {FilterQuery} from "models/interfaces/FilterQuery";

export enum Operators {
    NUM_EQ = "=",
    NUM_NEQ = "!=",
    NUM_GT = ">",
    NUM_GTE = ">=",
    NUM_LT = "<",
    NUM_LTE = "<=",
    STR_LIKE = "contains",
    STR_EQ = "equals",
    STR_START = "startWith",
    STR_END = "endsWith",
    DT_EQ = "is",
    DT_NEQ = "not",
    DT_GT = "after",
    DT_GTE = "onOrAfter",
    DT_LT = "before",
    DT_LTE = "onOrBefore",
    NULL = "isEmpty",
    NOT_NULL = "isNotEmpty",
}

export const transformFilterData = <T extends object>(
    filterData: FilterData,
    columnDefs: AppGridColDef<T>[],
    activeColumns: Record<GridRowId, boolean>
): FilterQuery => {
    const _order = filterData.order ? filterData.order.toUpperCase() : null;

    const filterQuery: FilterQuery = {
        limit: String(filterData.limit),
        offset: String(filterData.offset),
        orderby: filterData.orderBy,
        order: _order,
        query: null,
        search: null,
    };

    if (
        filterData.column !== null &&
        filterData.operator !== null &&
        filterData.value !== null
    ) {
        filterData = transformToQuery(filterData);
        const escapedValue = filterData.value
            ?.replace(",", "${1}")
            .replace("&", "${2}");
        filterQuery.query = `column=${filterData.column}&operator=${filterData.operator}&value=${escapedValue}`;
    }

    if (filterData.search !== null) {
        const escapedSearch = filterData.search
            .replace(",", "${1}")
            .replace("&", "${2}");

        let columns = "";
        let operators = "";
        let values = "";
        for (let i = 0; i < columnDefs.length; i++) {
            const columnDef = columnDefs[i];
            const isActive = typeof activeColumns[columnDef.field] === "undefined" ? true : activeColumns[columnDef.field];
            if (isActive && (typeof columnDef.filterable === "undefined" || columnDef.filterable)) {
                if (columns === "") {
                    columns += `${columnDef.field}`;
                    operators += "LIKE";
                    values += `${escapedSearch}`;
                } else {
                    columns += `,${columnDef.field}`;
                    operators += ",LIKE";
                    values += `,${escapedSearch}`;
                }
            }
        }
        filterQuery.search = `column=${columns}&operator=${operators}&value=${values}`;
    }

    return filterQuery;
};
export const transformToQuery = (filterData: FilterData): FilterData => {
    switch (filterData.operator) {
        case Operators.NULL:
            filterData = transformIsEmpty(filterData);
            break;
        case Operators.NOT_NULL:
            filterData = transformIsNotEmpty(filterData);
            break;
        case Operators.NUM_NEQ:
            filterData = transformNotEquals(filterData);
            break;
        case Operators.STR_LIKE:
            filterData = transformContains(filterData);
            break;
        case Operators.STR_EQ:
            filterData = transformEquals(filterData);
            break;
        case Operators.STR_START:
            filterData = transformStartWith(filterData);
            break;
        case Operators.STR_END:
            filterData = transformEndsWith(filterData);
            break;
        case Operators.DT_EQ:
            filterData = transformIs(filterData);
            break;
        case Operators.DT_NEQ:
            filterData = transformIsNot(filterData);
            break;
        case Operators.DT_GT:
            filterData = transformIsAfter(filterData);
            break;
        case Operators.DT_GTE:
            filterData = transformIsOnOrAfter(filterData);
            break;
        case Operators.DT_LT:
            filterData = transformIsBefore(filterData);
            break;
        case Operators.DT_LTE:
            filterData = transformIsOnOrBefore(filterData);
            break;
    }
    return filterData;
};

const transformIsEmpty = (filterData: FilterData): FilterData => {
    filterData.operator = "is";
    filterData.value = "null";
    return filterData;
};
const transformIsNotEmpty = (filterData: FilterData): FilterData => {
    filterData.operator = "is";
    filterData.value = "not null";
    return filterData;
};
const transformNotEquals = (filterData: FilterData): FilterData => {
    filterData.operator = "<>";
    return filterData;
};
const transformContains = (filterData: FilterData): FilterData => {
    filterData.operator = "LIKE";
    filterData.value = `%${filterData.value}%`;
    return filterData;
};
const transformEquals = (filterData: FilterData): FilterData => {
    filterData.operator = "=";
    return filterData;
};
const transformStartWith = (filterData: FilterData): FilterData => {
    filterData.operator = "LIKE";
    filterData.value = `%${filterData.value}`;
    return filterData;
};
const transformEndsWith = (filterData: FilterData): FilterData => {
    filterData.operator = "LIKE";
    filterData.value = `${filterData.value}%`;
    return filterData;
};
const transformIs = (filterData: FilterData): FilterData => {
    filterData.operator = "=";
    filterData.value = transformDate(filterData.value);
    return filterData;
};
const transformIsNot = (filterData: FilterData): FilterData => {
    filterData.operator = "<>";
    filterData.value = transformDate(filterData.value);
    return filterData;
};
const transformIsAfter = (filterData: FilterData): FilterData => {
    filterData.operator = ">";
    filterData.value = transformDate(filterData.value);
    return filterData;
};
const transformIsOnOrAfter = (filterData: FilterData): FilterData => {
    filterData.operator = ">=";
    filterData.value = transformDate(filterData.value);
    return filterData;
};
const transformIsBefore = (filterData: FilterData): FilterData => {
    filterData.operator = "<";
    filterData.value = transformDate(filterData.value);
    return filterData;
};
const transformIsOnOrBefore = (filterData: FilterData): FilterData => {
    filterData.operator = "<=";
    filterData.value = transformDate(filterData.value);
    return filterData;
};

const transformDate = (date: string | null): string | null => {
    if (date === null) {
        return null;
    }
    const splitDash = date.split("-");
    const year = splitDash[0];
    const month = splitDash[1];
    const splitT = splitDash[2].split("T");
    const day = splitT[0];
    const hour = splitT[1];
    const time = `${hour}:00`;
    if (typeof hour === "undefined") {
        return `${year}-${month}-${day}`;
    } else {
        return `${year}-${month}-${day} ${time}`;
    }
};

export const isFilterSet = (filterModel: GridFilterModel) => {
    const item = filterModel.items[0];
    const isNullTest =
        item.operatorValue === "isEmpty" || item.operatorValue === "isNotEmpty";
    const isValueSet = typeof item.value !== "undefined" && item.value !== null;
    return isNullTest || isValueSet;
};

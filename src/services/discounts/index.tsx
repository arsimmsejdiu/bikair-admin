import {GridRowId} from "@mui/x-data-grid/models";
import {DELETE_DISCOUNT, GET_DISCOUNT, GET_DISCOUNTS_LIST, POST_DISCOUNT, PUT_DISCOUNT} from "config/endpoints";
import {columns} from "models/data/Discounts";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {
    GetDiscountOutput,
    GetDiscountsOutput,
    PostDiscountsInput,
    PostDiscountsOutput,
    PutDiscountsInput,
    PutDiscountsOutput
} from "@bikairproject/shared";

export const getDiscounts = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetDiscountsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetDiscountsOutput>(GET_DISCOUNTS_LIST, config);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            console.warn("throw error");
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

export const createDiscount = async (discount: PostDiscountsInput): Promise<PostDiscountsOutput | null> => {
    try {
        const response = await instanceApi.post<PostDiscountsOutput>(POST_DISCOUNT, discount);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const updateDiscount = async (discount: PutDiscountsInput): Promise<PutDiscountsOutput | null> => {
    try {
        const response = await instanceApi.put<PutDiscountsOutput>(PUT_DISCOUNT, discount);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const getDiscount = async (discountId: number): Promise<GetDiscountOutput | null> => {
    try {
        const response = await instanceApi.get<GetDiscountOutput>(GET_DISCOUNT(discountId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const deleteDiscount = async (discountId: number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_DISCOUNT(discountId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

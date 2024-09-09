import { GET_PRODUCTS } from "config/endpoints";
import { instanceApi } from "services/http";

import { GetProductsOutput } from "@bikairproject/shared";

export const getProducts = async (): Promise<GetProductsOutput> => {
    try {
        const response = await instanceApi.get<GetProductsOutput>(GET_PRODUCTS);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            console.warn("throw error");
            throw error;
        }
        return [];
    }
};

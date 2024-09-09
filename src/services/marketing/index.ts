import {GridRowId} from "@mui/x-data-grid/models";
import {DELETE_MARKETING, GET_MARKETING, GET_MARKETING_LIST, POST_MARKETING, PUT_MARKETING} from "config/endpoints";
import {columns} from "models/data/Marketings";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {
    GetMarketingsOutput,
    MarketingCampaigns,
    MarketingCampaignsCreate,
    MarketingCampaignsUpdate
} from "@bikairproject/shared";

export const getMarketingList = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetMarketingsOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const response = await instanceApi.get<GetMarketingsOutput>(GET_MARKETING_LIST, config);
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        } else {
            return {
                offset: Number(filterData.offset),
                limit: Number(filterData.limit),
                rows: [],
                total: 0
            };
        }
    }
};

export const getMarketing = async (marketingId: number): Promise<MarketingCampaigns | null> => {
    try {
        const response = await instanceApi.get<MarketingCampaigns>(GET_MARKETING(marketingId));
        return response.data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const updateMarketing = async (marketing: MarketingCampaignsUpdate): Promise<MarketingCampaigns | null> => {
    try {
        const response = await instanceApi.put<MarketingCampaigns>(PUT_MARKETING(marketing.id), marketing);
        return response.data;

    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};


export const createMarketing = async (marketing: MarketingCampaignsCreate): Promise<MarketingCampaigns | null> => {
    try {
        const response = await instanceApi.post<MarketingCampaigns>(POST_MARKETING, marketing);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const deleteMarketing = async (marketingId: number): Promise<void> => {
    try {
        await instanceApi.delete(DELETE_MARKETING(marketingId));
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
    }
};

import {GridRowId} from "@mui/x-data-grid/models";
import {columns} from "models/data/Subscriptions";
import {FilterData} from "models/interfaces/FilterData";
import {transformFilterData} from "services/dataFilterUtils";
import {instanceApi} from "services/http";

import {GET_SUBSCRIPTION_DETAIL, GET_SUBSCRIPTIONS_LIST, PUT_SUBSCRIPTION,} from "../../config/endpoints";
import {
    GetSubscriptionDetailOutput,
    GetUserSubscriptionListOutput,
    PutUserSubscriptionInput,
    PutUserSubscriptionOutput
} from "@bikairproject/shared";

export const getSubscriptionList = async (
    filterData: FilterData,
    activeColumns: Record<GridRowId, boolean>
): Promise<GetUserSubscriptionListOutput> => {
    try {
        const config = {
            params: transformFilterData(filterData, columns, activeColumns)
        };
        const {data} = await instanceApi.get<GetUserSubscriptionListOutput>(GET_SUBSCRIPTIONS_LIST, config);
        return data;
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

export const getSubscription = async (subscriptionId: number): Promise<GetSubscriptionDetailOutput | null> => {
    try {
        const {data} = await instanceApi.get<GetSubscriptionDetailOutput>(GET_SUBSCRIPTION_DETAIL(subscriptionId));
        console.log("Get User Subscription --> ", data);
        return data;
    } catch (error: any) {
        console.debug(error);
        if (error.response.status) {
            throw error;
        }
        return null;
    }
};

export const updateSubscription = async (id: number, subscription: PutUserSubscriptionInput): Promise<PutUserSubscriptionOutput> => {
    try {
        const {data} = await instanceApi.put<PutUserSubscriptionOutput>(PUT_SUBSCRIPTION(id), subscription);
        return data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return {};
    }
};

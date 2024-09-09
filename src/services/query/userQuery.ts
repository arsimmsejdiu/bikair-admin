import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {API_ENDPOINT} from "../../config/endpoints";
import {GetUsersOutput} from "@bikairproject/shared";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: API_ENDPOINT}),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<GetUsersOutput[], void>({ // void -> means we are not going to send any arguments
            query: () => "/users",
            // providesTags: [{type: "Users", id: "LIST"}]
        })
    })
});

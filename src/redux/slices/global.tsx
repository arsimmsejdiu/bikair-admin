import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {
    AccessRights,
    AdminMe,
    BikeStatusType,
    GetAdminMeOutput,
    GetCitiesOutputData,
    GetCityPolygonsOutputData,
    GetCityRedZonesOutputData,
    Roles
} from "@bikairproject/shared";

interface GlobalType {
    title: string;
    parts: string[];
    firstname: string | null,
    statusAvailable: BikeStatusType[];
    cities: GetCitiesOutputData[];
    accessRights: AccessRights[];
    roles: Roles[];
    citiesPolygon: GetCityPolygonsOutputData[];
    citiesRedZones: GetCityRedZonesOutputData[];
    citiesName: string[];
    rolesName: string[];
    accessRightsName: string[];
    userAccessRights: string[];
    me: AdminMe | null
}

const initialState: GlobalType = {
    title: "",
    firstname: "",
    parts: [],
    roles: [],
    statusAvailable: [],
    accessRights: [],
    cities: [],
    citiesPolygon: [],
    citiesRedZones: [],
    citiesName: [],
    accessRightsName: [],
    userAccessRights: [],
    rolesName: [],
    me: null
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setMe: (state, action: PayloadAction<GetAdminMeOutput>) => {
            state.me = action.payload.user;
            state.statusAvailable = action.payload.STATIC_DATA.status_available;
            state.parts = action.payload.STATIC_DATA.parts;
            state.userAccessRights = action.payload.user.access_rights;
            state.firstname = action.payload.user.firstname;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setAccessRights: (state, action) => {
            state.accessRights = action.payload;
        },
        setCities: (state, action: PayloadAction<GetCitiesOutputData[]>) => {
            state.cities = action.payload;
        },
        setCitiesPolygon: (state, action: PayloadAction<GetCityPolygonsOutputData[]>) => {
            state.citiesPolygon = action.payload;
        },
        setCitiesNames: (state, action: PayloadAction<string[]>) => {
            state.citiesName = action.payload;
        },
        setAccessRightsName: (state, action) => {
            state.accessRightsName = action.payload;
        },
        setRolesName: (state, action) => {
            state.rolesName = action.payload;
        },
        setCitiesRedZones: (state, action: PayloadAction<GetCityRedZonesOutputData[]>) => {
            state.citiesRedZones = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTitle,
    setCities,
    setCitiesPolygon,
    setAccessRights,
    setAccessRightsName,
    setRolesName,
    setCitiesNames,
    setCitiesRedZones,
    setRoles,
    setMe,
} =
    globalSlice.actions;

export default globalSlice.reducer;

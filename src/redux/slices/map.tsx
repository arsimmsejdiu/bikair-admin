import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapStateType {
    lat: number,
    lng: number,
    zoom: number
}

const initialState: MapStateType = {
    lat: 46.9909,
    lng: 3.1628,
    zoom: 15
};

export const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<{ center: { lat: number, lng: number }, zoom: number }>) => {
            state.lat = action.payload.center.lat;
            state.lng = action.payload.center.lng;
            state.zoom = action.payload.zoom;
        },
        setLat: (state, action: PayloadAction<number>) => {
            state.lat = action.payload;
        },
        setLng: (state, action: PayloadAction<number>) => {
            state.lng = action.payload;
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setPosition,
    setLat,
    setLng,
    setZoom,
} = gridSlice.actions;

export default gridSlice.reducer;

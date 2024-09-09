import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        theme: false,
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;

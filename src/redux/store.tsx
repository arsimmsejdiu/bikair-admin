import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "redux/slices/global";
import gridReducer from "redux/slices/grid";
import mapReducer from "redux/slices/map";
import settingsReducer from "redux/slices/settings";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        global: globalReducer,
        grid: gridReducer,
        map: mapReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

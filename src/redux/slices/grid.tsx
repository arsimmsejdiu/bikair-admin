import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface GridStateType {
    loading: boolean,
    loadingCount: number,
    newFilter: boolean,
    limit: number,
    offset: number,
    orderBy: string | null,
    order: string | null,
    value: string | null,
    operator: string | null,
    column: string | null,
    search: string | null,
    newValue: string | null,
    newOperator: string | null,
    newColumn: string | null,
    newSearch: string | null,
}

const initialState: GridStateType = {
    loading: false,
    loadingCount: 0,
    newFilter: false,
    limit: 100,
    offset: 0,
    orderBy: "id",
    order: "desc",
    value: null,
    operator: null,
    column: null,
    search: null,
    newValue: null,
    newOperator: null,
    newColumn: null,
    newSearch: null,
};

const isNewFilter = (state: Draft<GridStateType>) => {
    return state.value !== state.newValue ||
        state.operator !== state.newOperator ||
        state.column !== state.newColumn ||
        state.search !== state.newSearch;
};

export const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        reset: (state) => {
            state.newFilter = initialState.newFilter;
            state.limit = initialState.limit;
            state.offset = initialState.offset;
            state.orderBy = initialState.orderBy;
            state.order = initialState.order;
            state.value = initialState.value;
            state.operator = initialState.operator;
            state.column = initialState.column;
            state.search = initialState.search;
            state.newValue = initialState.newValue;
            state.newOperator = initialState.newOperator;
            state.newColumn = initialState.newColumn;
            state.newSearch = initialState.newSearch;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            const value = action.payload;
            if (value) {
                state.loadingCount += 1;
                state.loading = true;
            } else {
                state.loadingCount -= 1;
                state.loading = state.loadingCount !== 0;
            }
        },
        setlimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setOrderBy: (state, action: PayloadAction<string | null>) => {
            state.orderBy = action.payload;
        },
        setOrder: (state, action: PayloadAction<string | null>) => {
            state.order = action.payload;
        },
        setValue: (state, action: PayloadAction<string | null>) => {
            state.value = action.payload;
        },
        setOperator: (state, action: PayloadAction<string | null>) => {
            state.operator = action.payload;
        },
        setColumn: (state, action: PayloadAction<string | null>) => {
            state.column = action.payload;
        },
        setSearch: (state, action: PayloadAction<string | null>) => {
            state.search = action.payload;
        },
        setNewValue: (state, action: PayloadAction<string | null>) => {
            state.newValue = action.payload;
            state.newFilter = isNewFilter(state);
        },
        setNewOperator: (state, action: PayloadAction<string | null>) => {
            state.newOperator = action.payload;
            state.newFilter = isNewFilter(state);
        },
        setNewColumn: (state, action: PayloadAction<string | null>) => {
            state.newColumn = action.payload;
            state.newFilter = isNewFilter(state);
        },
        setNewSearch: (state, action: PayloadAction<string | null>) => {
            state.newSearch = action.payload;
            state.newFilter = isNewFilter(state);
        },
        setNewFilter: (state) => {
            state.newFilter = isNewFilter(state);
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    reset,
    setLoading,
    setlimit,
    setOffset,
    setOrderBy,
    setOrder,
    setValue,
    setOperator,
    setColumn,
    setSearch,
    setNewValue,
    setNewOperator,
    setNewColumn,
    setNewSearch,
    setNewFilter,
} = gridSlice.actions;

export default gridSlice.reducer;

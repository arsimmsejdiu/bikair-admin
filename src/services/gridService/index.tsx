import {FilterGrid} from "models/interfaces/FilterGrid";

export const isFilterButtonActive = (state: FilterGrid) => {
    return state.value !== state.newValue ||
        state.operator !== state.newOperator ||
        state.column !== state.newColumn ||
        state.search !== state.newSearch;
};

export const isNewFilter = (oldState: FilterGrid, newState: FilterGrid) => {
    if (oldState.limit !== newState.limit) {
        return true;
    }
    if (oldState.offset !== newState.offset) {
        return true;
    }
    if (oldState.column !== newState.column) {
        return true;
    }
    if (oldState.operator !== newState.operator) {
        return true;
    }
    if (oldState.value !== newState.value) {
        return true;
    }
    if (oldState.orderBy !== newState.orderBy) {
        return true;
    }
    if (oldState.order !== newState.order) {
        return true;
    }
    if (oldState.search !== newState.search) {
        return true;
    }
    return false;
};

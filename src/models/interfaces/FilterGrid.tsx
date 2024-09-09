import { FilterData } from "./FilterData";

export interface FilterGrid extends FilterData {
    newFilter: boolean,
    newValue: string | null,
    newOperator: string | null,
    newColumn: string | null,
    newSearch: string | null,
}

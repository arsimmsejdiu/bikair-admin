import { Data } from "models/data/Data";

export interface SingleResponse<D extends Data> {
    rows: D,
    total: number
}

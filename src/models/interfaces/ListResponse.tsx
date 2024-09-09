export interface ListResponse<T> {
    rows: T[],
    total: string,
    lastUpdate: number | null,
}

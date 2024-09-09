export interface FilterData {
    limit: number,
    offset: number,
    column: string | null,
    operator: string | null,
    value: string | null,
    orderBy: string | null,
    order: "asc" | "desc" | null
    search: string | null
}

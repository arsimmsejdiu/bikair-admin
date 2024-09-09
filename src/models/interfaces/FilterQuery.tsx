export interface FilterQuery {
    limit: string,
    offset: string,
    query: string | null,
    search: string | null,
    orderby: string | null,
    order: string | null
}

export interface Pagination {
    current: number;
    pageSize: number;
    total: number;
}

export const defaultPagination = {
    current: 1,
    pageSize: 40,
    total: 1,
}
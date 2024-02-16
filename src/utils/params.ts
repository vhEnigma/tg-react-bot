import {IParams} from "../types/params.ts";


export const getQueryString = (params:IParams) => {
    const {q, pageSize = 10, page} = params
    const searchParams = new URLSearchParams();
    searchParams.append('pageSize', `${pageSize}`)

    if (q) {
        searchParams.append('q', q);
    }

    if (page) {
        searchParams.append('page', `${page}`);
    }

    return `?${searchParams.toString()}`
}
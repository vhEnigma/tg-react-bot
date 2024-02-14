export type MenuListType = {
    id: number
    name: string
}

export type MenuListResponseType = {
    page: number
    result: MenuListType[]
}

export type ParamsMenuListRequest = {
    searchValue?: string
    page?: number
    pageSize?: number
}
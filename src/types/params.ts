export interface IParams {
    page?:number
    pageSize?: number
    q?: string
}

export interface IParamsWithId extends IParams{
    id?: string
}
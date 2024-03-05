export interface IParams {
  page?: number
  pageSize?: number
  date_from?: number
  date_to?: number
  q?: string
  id?: string
}

export type QueryParamsType = {
  from?: number
  to?: number
  requestId?: string
}

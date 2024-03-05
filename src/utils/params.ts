import { IParams } from '../types/params'
import { PAGE_SIZE } from '../constants/common'

export const getQueryString = (params: IParams) => {
  const { q, pageSize = PAGE_SIZE, page, date_from, date_to } = params
  const searchParams = new URLSearchParams()
  searchParams.append('pageSize', `${pageSize}`)

  if (q) {
    searchParams.append('q', q)
  }

  if (page) {
    searchParams.append('page', `${page}`)
  }

  if (date_to && date_from) {
    searchParams.append('date_from', `${date_from}`)
    searchParams.append('date_to', `${date_to}`)
  }

  return `?${searchParams.toString()}`
}

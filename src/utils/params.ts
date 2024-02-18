import { IParams } from '../types/params'
import { PAGE_SIZE } from '../constants/common'

export const getQueryString = (params: IParams) => {
  const { q, pageSize = PAGE_SIZE, page } = params
  const searchParams = new URLSearchParams()
  searchParams.append('pageSize', `${pageSize}`)

  if (q) {
    searchParams.append('q', q)
  }

  if (page) {
    searchParams.append('page', `${page}`)
  }

  return `?${searchParams.toString()}`
}

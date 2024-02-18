import { useQuery } from '@tanstack/react-query'
import { IParamsWithId } from '../../types/params'
import { ResultResponseType } from '../../types/menuList'

type useTestByFilterProps<T> = {
  request: (params: IParamsWithId) => Promise<ResultResponseType<T>>
  params: {
    id?: string
    page: number
  }
  queryKey: string
  enabled: boolean
}

const useMenuListByFilter = <T>(props: useTestByFilterProps<T>) => {
  const { request, params, queryKey, enabled } = props
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => request(params),
    select: ({ result }) => result,
    enabled
  })
}

export default useMenuListByFilter

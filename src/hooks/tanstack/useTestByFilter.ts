import { useQuery } from '@tanstack/react-query'
import { IParamsWithId } from '../../types/params'
import { ResultResponseType, TestType } from '../../types/menuList'

type useTestByFilterProps = {
  request: (params: IParamsWithId) => Promise<ResultResponseType<TestType>>
  params: { id?: string }
  queryKey: string
}

const useTestByFilter = (props: useTestByFilterProps) => {
  const { request, params, queryKey } = props
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => request(params),
    select: ({ result }) => result
  })
}

export default useTestByFilter

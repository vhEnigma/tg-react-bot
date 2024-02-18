import { useQuery } from '@tanstack/react-query'
import { IParamsWithId } from '../../types/params'
import { ArticleType, ResultResponseType } from '../../types/menuList'

type useArticleByFilterProps = {
  request: (params: IParamsWithId) => Promise<ResultResponseType<ArticleType>>
  params: { id?: string }
  queryKey: string
}

const useArticleByFilter = (props: useArticleByFilterProps) => {
  const { request, params, queryKey } = props
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => request(params),
    select: ({ result }) => result
  })
}

export default useArticleByFilter

import { useQuery } from '@tanstack/react-query'
import { IParams } from '../../types/params'
import { MenuListType } from '../../types/menuList'

type useMenuProps = {
  request: (params: IParams) => Promise<MenuListType[]>
  params: IParams
  queryKey: string
}

const useMenuList = (props: useMenuProps) => {
  const { queryKey, request, params } = props
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => request(params)
  })
}

export default useMenuList

import { useQuery } from '@tanstack/react-query'
import { IParams } from '../../types/params'
import { MenuListType } from '../../types/menuList'

type useMenuProps = {
  callback: (params: IParams) => Promise<MenuListType[]>
  params: IParams
  queryKey: string
  condition: boolean
}

const useMenuList = (props: useMenuProps) => {
  const { queryKey, condition, callback, params } = props
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => callback(params),
    enabled: condition ?? true,
    refetchOnMount: true
  })
}

export default useMenuList

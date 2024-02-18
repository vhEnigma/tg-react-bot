import { useQuery } from '@tanstack/react-query'
import { MenuListType } from '../../types/menuList'

type useMenuProps = {
  request: (id: string) => Promise<MenuListType>
  queryKey: string
  id?: string
}

const useGetInfo = (props: useMenuProps) => {
  const { id, queryKey, request } = props
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => {
      if (id) {
        return request(id)
      }
    },
    enabled: !!id
  })
}

export default useGetInfo

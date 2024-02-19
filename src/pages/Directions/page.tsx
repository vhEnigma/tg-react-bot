import { FC } from 'react'

import { ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import InfinityScrollList, { RenderItemsProps } from '../../components/InfinityScrollList'
import { MenuListType } from '../../types/menuList'
import useTgTheme from '../../hooks/useTgTheme'

const Directions: FC = () => {
  const { button_color } = useTgTheme()
  const request = DirectionService.listDirectionRequest
  const route = RouteList.Directions
  const navigate = useNavigate()

  const openItemHandle = (id: number) => {
    navigate(`/${route}/${id}`)
  }
  const renderItems = (props: RenderItemsProps<MenuListType>) => {
    const { inView, ref, isStopInfinityScroll, dataList: renderList } = props
    // if (Array.isArray(searchList) && searchList.length === 0) {
    //   return <NotFound />
    // }

    // const array = searchList || renderList
    const lastIndex = renderList.length - 1
    return renderList.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      const opacity = inView && !isStopInfinityScroll ? 0.3 : 1
      if (isLastElement) {
        return (
          <ListItemButton ref={ref} onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
            <ListItemText primary={name} />
          </ListItemButton>
        )
      }
      return (
        <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}`, opacity }}>
          <ListItemText primary={name} />
        </ListItemButton>
      )
    })
  }

  return <InfinityScrollList<MenuListType> renderItems={renderItems} request={request} />

  // return <MenuList route={route} callback={callback} />
}

export default Directions

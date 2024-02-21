import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListItemButton, ListItemText } from '@mui/material'
import MenuList from '../../components/MenuList'
import { TechnologyService } from '../../services/Technology'
import { RouteList } from '../../routes/routes'
import useTgTheme from '../../hooks/useTgTheme'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { MenuListType } from '../../types/menuList'
import NotFound from '../../components/NotFound'

const Technology: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()

  const openItemHandle = (id: number) => {
    navigate(`/${RouteList.Technology}/${id}`)
  }
  const getItems = (props: RenderItemsProps<MenuListType>) => {
    const { dataList, ref } = props
    if (dataList.length === 0) return <NotFound />
    const lastIndex = dataList.length - 1
    return dataList.map(({ id, name }, index) => {
      const isLastElement = index === lastIndex
      if (isLastElement) {
        return (
          <ListItemButton ref={ref} onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
            <ListItemText primary={name} />
          </ListItemButton>
        )
      }
      return (
        <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
          <ListItemText primary={name} />
        </ListItemButton>
      )
    })
  }
  return <MenuList<MenuListType> request={TechnologyService.listTechnologyRequest} getItems={getItems} />
}

export default Technology

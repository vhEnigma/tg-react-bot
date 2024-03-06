import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListItemButton, ListItemText } from '@mui/material'
import MenuList from '../../components/MenuList'
import { TechnologyService } from '../../services/Technology'
import { RouteList } from '../../routes/routes'
import useTgTheme from '../../hooks/useTgTheme'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import { MenuListType } from '../../types/menuList'
import { MultiLineEllipsisStyle } from '../../constants/style'

const Technology: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()

  const openItemHandle = (id: number) => {
    navigate(`/${RouteList.Technology}/${id}`)
  }
  const getItems = (props: RenderItemsProps<MenuListType>) => {
    const { dataList } = props
    return dataList.map(({ id, name, picture }) => (
      <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
        <img src={picture} alt='icon' style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '10px' }} />
        <ListItemText sx={MultiLineEllipsisStyle} primary={name} />
      </ListItemButton>
    ))
  }
  return <MenuList<MenuListType> request={TechnologyService.listTechnologyRequest} getItems={getItems} />
}

export default Technology

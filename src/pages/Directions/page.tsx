import { FC } from 'react'
import { ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import MenuList from '../../components/MenuList'
import useTgTheme from '../../hooks/useTgTheme'
import { MenuListType } from '../../types/menuList'
import { RenderItemsProps } from '../../components/InfinityScrollList'
import icon from '../../../public/js.svg'
import { MultiLineEllipsisStyle } from '../../constants/style'

const Directions: FC = () => {
  const { button_color } = useTgTheme()
  const navigate = useNavigate()

  const openItemHandle = (id: number) => {
    navigate(`/${RouteList.Directions}/${id}`)
  }
  const getItems = (props: RenderItemsProps<MenuListType>) => {
    const { dataList } = props
    return dataList.map(({ id, name }) => (
      <ListItemButton onClick={() => openItemHandle(id)} key={id} sx={{ borderTop: `1px solid ${button_color}` }}>
        <img src={icon} alt='icon' style={{ borderRadius: '50%' }} />
        <ListItemText sx={MultiLineEllipsisStyle} primary={name} />
      </ListItemButton>
    ))
  }

  return <MenuList<MenuListType> request={DirectionService.listDirectionRequest} getItems={getItems} />
}

export default Directions

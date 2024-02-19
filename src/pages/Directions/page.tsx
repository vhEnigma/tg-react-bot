import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import MenuList from '../../components/MenuList'

const Directions: FC = () => {
  const callback = DirectionService.listDirectionRequest
  const route = RouteList.Directions
  return <MenuList route={route} callback={callback} />
}

export default Directions

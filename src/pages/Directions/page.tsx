import { FC } from 'react'

import MenuList from '../../components/MenuList'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'

const Directions: FC = () => {
  const callback = DirectionService.listDirectionRequest
  const route = RouteList.Directions
  return <MenuList route={route} callback={callback} />
}

export default Directions

import { FC } from 'react'

import MenuList from '../../components/MenuList'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import { QUERY_KEYS } from '../../constants/tanstack'

const Directions: FC = () => (
  <MenuList route={RouteList.Directions} request={DirectionService.listDirection} queryKey={QUERY_KEYS.direction.listDirection} />
)

export default Directions

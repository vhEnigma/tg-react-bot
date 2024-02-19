import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import { RouteList } from '../../routes/routes'
import MenuList from '../../components/MenuList'

const Directions: FC = () => <MenuList route={RouteList.Directions} request={DirectionService.listDirectionRequest} />

export default Directions

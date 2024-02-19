import { FC } from 'react'
import MenuList from '../../components/MenuList'
import { TechnologyService } from '../../services/Technology'
import { RouteList } from '../../routes/routes'

const Technology: FC = () => <MenuList route={RouteList.Technology} request={TechnologyService.listTechnologyRequest} />

export default Technology

import { FC } from 'react'
import MenuList from '../../components/MenuList'
import { TechnologyService } from '../../services/Technology'
import { RouteList } from '../../routes/routes'

const Technology: FC = () => {
  const callback = TechnologyService.listTechnologyRequest
  const route = RouteList.Technology
  return <MenuList route={route} callback={callback} />
}

export default Technology

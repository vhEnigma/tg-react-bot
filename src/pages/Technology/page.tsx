import { FC } from 'react'
import MenuList from '../../components/MenuList'
import { TechnologyService } from '../../services/Technology'
import { RouteList } from '../../routes/routes'
import { QUERY_KEYS } from '../../constants/tanstack'

const Technology: FC = () => (
  <MenuList route={RouteList.Technology} request={TechnologyService.listTechnology} queryKey={QUERY_KEYS.technology.listTechnology} />
)

export default Technology

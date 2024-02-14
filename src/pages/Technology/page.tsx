import { FC } from 'react'
import MenuList from "../../components/MenuList";
import {TechnologyService} from "../../services/Technology";


const Technology: FC = () => {
  const callback = TechnologyService.listTechnologyRequest
  return <MenuList callback={callback} />
}

export default Technology
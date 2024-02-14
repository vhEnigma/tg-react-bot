import {FC} from 'react'

import MenuList from "../../components/MenuList";
import {DirectionService} from "../../services/Direction";

const Directions: FC = () => {
  const callback = DirectionService.listDirectionRequest
  return <MenuList callback={callback} />
}

export default Directions
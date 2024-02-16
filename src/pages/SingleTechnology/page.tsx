import {FC} from 'react'
import Library from "../../components/Library";
import {TechnologyService} from "../../services/Technology";

const SingleTechnology: FC = () => {

  const getInfo = TechnologyService.getTechnologyInfoRequest
  const getArticleByFilter = TechnologyService.getArticleListByTechnologyRequest
  const getTestByFilter = TechnologyService.getTestListByTechnologyRequest

  return <Library getInfo={getInfo}
                  getArticleByFilter={getArticleByFilter}
                  getTestByFilter={getTestByFilter}/>
}
export default SingleTechnology
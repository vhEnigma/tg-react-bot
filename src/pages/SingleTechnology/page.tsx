import { FC } from 'react'
import Library from '../../components/Library'
import { TechnologyService } from '../../services/Technology'

const SingleTechnology: FC = () => {
  const getInfo = TechnologyService.getTechnologyInfo
  const getArticleByFilter = TechnologyService.getArticleListByTechnology
  const getTestByFilter = TechnologyService.getTestListByTechnology

  return <Library getInfo={getInfo} getArticleByFilter={getArticleByFilter} getTestByFilter={getTestByFilter} />
}
export default SingleTechnology

import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import Library from '../../components/Library'

const SingleDirection: FC = () => {
  const getInfo = DirectionService.getDirectionInfo
  const getArticleByFilter = DirectionService.getArticleListByDirection
  const getTestByFilter = DirectionService.getTestListByDirection

  return <Library getInfo={getInfo} getArticleByFilter={getArticleByFilter} getTestByFilter={getTestByFilter} />
}

export default SingleDirection

import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import Library from '../../components/Library'

const SingleDirection: FC = () => {
  const getInfo = DirectionService.getDirectionInfoRequest
  const getArticleByFilter = DirectionService.getArticleListByDirectionRequest
  const getTestByFilter = DirectionService.getTestListByDirectionRequest

  return <Library getInfo={getInfo} getArticleByFilter={getArticleByFilter} getTestByFilter={getTestByFilter} />
}

export default SingleDirection

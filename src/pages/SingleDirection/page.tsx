import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import Library from '../../components/Library'
import { QUERY_KEYS } from '../../constants/tanstack'

const SingleDirection: FC = () => (
  <Library
    getInfo={{ request: DirectionService.getDirectionInfo, queryKey: QUERY_KEYS.direction.getDirectionInfo }}
    getArticleByFilter={{
      request: DirectionService.getArticleListByDirection,
      queryKey: QUERY_KEYS.direction.getArticleListByDirection
    }}
    getTestByFilter={{
      request: DirectionService.getTestListByDirection,
      queryKey: QUERY_KEYS.direction.getTestListByDirection
    }}
  />
)

export default SingleDirection

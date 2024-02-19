import { FC } from 'react'
import { DirectionService } from '../../services/Direction'
import Catalog from '../../components/Catalog'

const SingleDirection: FC = () => (
  <Catalog
    getInfoRequest={DirectionService.getDirectionInfoRequest}
    articlesByFilterRequest={DirectionService.getArticleListByDirectionRequest}
    testsByFilterRequest={DirectionService.getTestListByDirectionRequest}
  />
)

export default SingleDirection

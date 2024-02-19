import { FC } from 'react'
import { TechnologyService } from '../../services/Technology'
import Catalog from '../../components/Catalog'

const SingleTechnology: FC = () => (
  <Catalog
    getInfoRequest={TechnologyService.getTechnologyInfoRequest}
    articlesByFilterRequest={TechnologyService.getArticleListByTechnologyRequest}
    testsByFilterRequest={TechnologyService.getTestListByTechnologyRequest}
  />
)
export default SingleTechnology

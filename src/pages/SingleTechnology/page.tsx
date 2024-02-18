import { FC } from 'react'
import Library from '../../components/Library'
import { TechnologyService } from '../../services/Technology'
import { QUERY_KEYS } from '../../constants/tanstack'

const SingleTechnology: FC = () => (
  <Library
    getInfo={{ request: TechnologyService.getTechnologyInfo, queryKey: QUERY_KEYS.technology.getTechnologyInfo }}
    getArticleByFilter={{
      request: TechnologyService.getArticleListByTechnology,
      queryKey: QUERY_KEYS.technology.getArticleListByTechnology
    }}
    getTestByFilter={{
      request: TechnologyService.getTestListByTechnology,
      queryKey: QUERY_KEYS.technology.getTestListByTechnology
    }}
  />
)
export default SingleTechnology

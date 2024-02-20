import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { IParams } from '../../types/params'
import { getQueryString } from '../../utils/params'
import { ArticleType } from '../../types/menuList'

export class ArticleService {
  static async getSingleArticle(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.article.getSingle}${queryString}`

    const { data: response } = await axiosInstance.get<ArticleType>(url)

    return response
  }

  static async setRating(id: string, rating: number) {
    const url = `${Endpoints.article.getSingle}/${id}/rating`

    const { data: response } = await axiosInstance.put<ArticleType>(url, { rating })

    return response
  }
}

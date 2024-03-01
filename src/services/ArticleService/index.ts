import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { ArticleType } from '../../types/menuList'
import { IParams } from '../../types/params'
import { getQueryString } from '../../utils/params'

export class ArticleService {
  static async getReadArticles(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.article.readList}${queryString}`

    const { data: response } = await axiosInstance.get<ArticleType[]>(url)

    return response
  }

  static async getSingleArticle(id: string) {
    const url = `${Endpoints.article.getSingle}/${id}`

    const { data: response } = await axiosInstance.get<ArticleType>(url)

    return response
  }

  static async setRating(id: string, rating: number) {
    const url = `${Endpoints.article.getSingle}/${id}/rating`

    const { data: response } = await axiosInstance.put<ArticleType>(url, { rating })

    return response
  }
}

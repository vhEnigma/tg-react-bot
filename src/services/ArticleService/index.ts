import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { ArticleType } from '../../types/menuList'

export class ArticleService {
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

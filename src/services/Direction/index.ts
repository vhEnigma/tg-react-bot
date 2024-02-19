import { axiosInstance } from '../client/httpClient'
import { Endpoints } from '../client/endpoints'
import { ArticleType, MenuListType, ResultResponseType, TestType } from '../../types/menuList'
import { IParams } from '../../types/params'
import { getQueryString } from '../../utils/params'

export class DirectionService {
  static async listDirectionRequest(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.directions}${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<MenuListType>>(url)
    return response.result
  }

  static async getDirectionInfoRequest(id: string) {
    const url = `${Endpoints.directions}/${id}`

    const { data: response } = await axiosInstance.get<MenuListType>(url)

    return response
  }

  static async getTestListByDirectionRequest(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.directions}/${params.id}/tests${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<TestType>>(url)

    return response.result
  }

  static async getArticleListByDirectionRequest(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.directions}/${params.id}/courses${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<ArticleType>>(url)

    return response.result
  }
}

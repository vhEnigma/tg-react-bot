import { axiosInstance } from '../client/httpClient'
import { Endpoints } from '../client/endpoints'
import { ArticleType, MenuListType, ResultResponseType, TestType } from '../../types/menuList'
import { IParams, IParamsWithId } from '../../types/params'
import { getQueryString } from '../../utils/params'

export class TechnologyService {
  static async listTechnology(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.technologies}${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<MenuListType>>(url)
    return response.result
  }

  static async getTechnologyInfo(id: string) {
    const url = `${Endpoints.technologies}/${id}`

    const { data: response } = await axiosInstance.get<MenuListType>(url)

    return response
  }

  static async getArticleListByTechnology(params: IParamsWithId) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.technologies}/${params.id}/courses${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<ArticleType>>(url)

    return response
  }

  static async getTestListByTechnology(params: IParamsWithId) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.technologies}/${params.id}/tests${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<TestType>>(url)

    return response
  }
}

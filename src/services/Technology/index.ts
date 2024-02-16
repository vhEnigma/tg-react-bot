import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";
import {ArticleType, MenuListType, ResultResponseType, TestType} from "../../types/menuList.ts";
import {IParams, IParamsWithId} from "../../types/params.ts";
import {getQueryString} from "../../utils/params.ts";

export class TechnologyService {
  static async listTechnologyRequest(params:IParams) {
    const queryString = getQueryString(params)
    const url =  `${Endpoints.technologies}${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<MenuListType>>(url)
    return response.result
  }

  static async getTechnologyInfoRequest (id:string) {
    const url = `${Endpoints.technologies}/${id}`

    const { data: response } = await axiosInstance.get<MenuListType>(url)

    return response
  }
  static async getArticleListByTechnologyRequest (params: IParamsWithId) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.technologies}/${params.id}/courses${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<ArticleType>>(url)

    return response
  }

  static async getTestListByTechnologyRequest (params: IParamsWithId) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.technologies}/${params.id}/tests${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<TestType>>(url)

    return response
  }

}

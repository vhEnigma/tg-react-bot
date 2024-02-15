import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";
import {MenuListResponseType} from "../../types/menuList.ts";
import {IParams} from "../../types/params.ts";
import {getQueryString} from "../../utils/params.ts";

export class TechnologyService {
  static async listTechnologyRequest(params:IParams) {
    const queryString = getQueryString(params)
    const url =  `${Endpoints.technologies}${queryString}`

    const { data: response } = await axiosInstance.get<MenuListResponseType>(url)
    return response.result
  }

}

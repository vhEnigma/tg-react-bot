import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";
import {MenuListResponseType} from "../../types/menuList.ts";
import {IParams, IParamsWithId} from "../../types/params.ts";
import {getQueryString} from "../../utils/params.ts";


export class DirectionService {
  static async listDirectionRequest(params:IParams) {
    const queryString = getQueryString(params)
    const url =  `${Endpoints.directions}${queryString}`

    const { data: response } = await axiosInstance.get<MenuListResponseType>(url)
    return response.result
  }

  static async getDirectionRequest (params: IParamsWithId) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.directions}/${params.id}/courses${queryString}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }
}

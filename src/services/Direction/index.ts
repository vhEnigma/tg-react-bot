import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";
import {MenuListResponseType, ParamsMenuListRequest} from "../../types/menuList.ts";


export class DirectionService {
  static async listDirectionRequest(params:ParamsMenuListRequest) {
    const {page, searchValue, pageSize = 20} = params
    let url =  Endpoints.directions

    const searchParams = new URLSearchParams();

    searchParams.append('pageSize', `${pageSize}`)
    if (searchValue) {
      searchParams.append('q', searchValue);
    }

    if (page) {
      searchParams.append('page', `${page}`);
    }

    url += `?${searchParams.toString()}`;

    const { data: response } = await axiosInstance.get<MenuListResponseType>(url)
    return response.result
  }

  static async getDirectionRequest (id: string) {
    const url = `${Endpoints.directions}/${id}`

    const { data: response } = await axiosInstance.get(url)
    console.log(response)
  }
}

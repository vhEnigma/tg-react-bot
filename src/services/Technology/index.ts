import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";
import {MenuListResponseType, ParamsMenuListRequest} from "../../types/menuList.ts";

export class TechnologyService {
  static async listTechnologyRequest(params:ParamsMenuListRequest) {
    const {page, searchValue, pageSize = 20} = params
    let url =  Endpoints.technologies

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

}

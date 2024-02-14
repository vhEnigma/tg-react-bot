import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";

export type ItemsType = {
  id: number
  name: string
}

type ListDirectionsResponseType = {
  page: number
  result: ItemsType[]
}

export type ParamsListDirectionsRequest = {
  searchValue?: string
  page?: number
  pageSize?: number
}

export class DirectionService {
  static async listDirectionRequest(params:ParamsListDirectionsRequest) {
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

    const { data: response } = await axiosInstance.get<ListDirectionsResponseType>(url)
    return response.result
  }

}

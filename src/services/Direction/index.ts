import { axiosInstance } from '../client/httpClient.ts'
import {Endpoints} from "../client/endpoints.ts";

type DirectionsType = {
  id: number
  name: string
}

type ListDirectionsResponseType = {
  page: number
  result: DirectionsType[]
}

type ParamsListDirectionsRequest = {
  searchValue?: string
  page?: number
  pageSize?: number
}

export class DirectionService {
  static async listDirectionRequest(params:ParamsListDirectionsRequest) {
    const {page, searchValue, pageSize = 100} = params
    const url =  new URL(Endpoints.directions)

    const searchParams = new URLSearchParams();

    searchParams.append('pageSize', `${pageSize}`)
    if (searchValue) {
      searchParams.append('search', searchValue);
    }

    if (page) {
      searchParams.append('page', `${page}`);
    }

    url.search = searchParams.toString();

    console.log(url, 'url', url.toString(), 'fuck')
    const { data: response } = await axiosInstance.get<ListDirectionsResponseType>(url.toString())
    return response
  }

}

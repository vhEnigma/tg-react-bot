// import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

// type DirectionsType = {
//   id: number
//   name: string
// }

// type ListDirectionsResponseType = {
//   page: number
//   result: DirectionsType[]
// }
let count = 0

type ParamsListDirectionsRequest = {
  searchValue?: string
  page?: number
}

export class DirectionService {
  static async listDirectionRequest(params:ParamsListDirectionsRequest) {
    const {searchValue, page} = params

    const url = new URL('https://jsonplaceholder.typicode.com/users');
    const searchParams = new URLSearchParams();

    if (searchValue) {
      searchParams.append('search', searchValue);
    }

    if (page) {
      searchParams.append('page', page.toString());
    }

    url.search = searchParams.toString();

    console.log(url, 'URL')
    // const pageNumber = page || 1
    count++

    if (count === 4) {
      return {result: []}
    }

    // const url = `${Endpoints.directions}?page=${pageNumber}&pageSize=100`
    // const url = `https://jsonplaceholder.typicode.com/users`

    // const { data: response } = await axiosInstance.get<ListDirectionsResponseType>(url)
    const { data: response } = await axiosInstance.get(url.toString())
    return {result: response}
    // return response
  }

}

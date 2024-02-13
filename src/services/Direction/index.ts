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

export class DirectionService {
  static async listDirectionRequest(page?: number) {
    // const pageNumber = page || 1
    console.log(page)
    // const url = `${Endpoints.directions}?page=${pageNumber}&pageSize=100`
    const url = `https://jsonplaceholder.typicode.com/users?_limit=10`

    // const { data: response } = await axiosInstance.get<ListDirectionsResponseType>(url)
    const { data: response } = await axiosInstance.get(url)
    return {result: response}
    // return response
  }

}

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

export class DirectionService {
  static async listDirectionRequest(page?: number) {
    // const pageNumber = page || 1
    console.log(page)
    count++

    if (count === 4) {
      return {result: []}
    }
    // const url = `${Endpoints.directions}?page=${pageNumber}&pageSize=100`
    const url = `https://jsonplaceholder.typicode.com/users`

    // const { data: response } = await axiosInstance.get<ListDirectionsResponseType>(url)
    const { data: response } = await axiosInstance.get(url)
    return {result: response}
    // return response
  }

}

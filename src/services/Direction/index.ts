import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

export class DirectionService {
  static async listDirectionRequest(page: number) {
    const pageNumber = page || 1
    const url = `${Endpoints.directions}?page=${pageNumber}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }

}

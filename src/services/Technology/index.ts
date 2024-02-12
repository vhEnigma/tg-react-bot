import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

export class TechnologyService {
  static async listTechnologyRequest(page?: number) {
    const pageNumber = page || 1
    const url = `${Endpoints.technologies}?page=${pageNumber}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }

}

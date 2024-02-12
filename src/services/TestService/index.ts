import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

export class TestService {
  static async listTestRequest(page?: number) {
    const pageNumber = page || 1
    const url = `${Endpoints.tests}?page=${pageNumber}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }

}

import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'

export class TestService {
  static async listTests(page?: number) {
    const pageNumber = page || 1
    const url = `${Endpoints.tests}?page=${pageNumber}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }
}

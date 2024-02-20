import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { TestType } from '../../types/menuList'

export class TestService {
  static async getTest(id: string) {
    const url = `${Endpoints.tests}${id}`

    const { data: response } = await axiosInstance.get<TestType>(url)

    return response
  }
}

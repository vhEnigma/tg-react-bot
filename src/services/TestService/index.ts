import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { IParams } from '../../types/params'
import { getQueryString } from '../../utils/params'

export class TestService {
  static async listTestRequest(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.tests}${queryString}`

    const { data: response } = await axiosInstance.get(url)

    return response
  }
}

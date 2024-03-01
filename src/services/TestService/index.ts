import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'
import { PassedTestResponseType, ResultResponseType, TestType } from '../../types/menuList'
import { IParams } from '../../types/params'
import { getQueryString } from '../../utils/params'

export class TestService {
  static async getTestResults(params: IParams) {
    const queryString = getQueryString(params)
    const url = `${Endpoints.test.testResult}${queryString}`

    const { data: response } = await axiosInstance.get<ResultResponseType<TestType>>(url)

    return response.result
  }

  static async getTestResult(id: string) {
    const url = `${Endpoints.tests}${id}/test_results`

    const { data: response } = await axiosInstance.get<PassedTestResponseType>(url)

    return response
  }

  static async getTest(id: string) {
    const url = `${Endpoints.tests}/${id}`

    const { data: response } = await axiosInstance.get<TestType>(url)

    return response
  }

  static async sendTest(data: Record<string, string | Record<string, number[]>>) {
    const url = `${Endpoints.tests}/${data.id}?tg_id=${data.tgId}`
    const { data: response } = await axiosInstance.post(url, data.answersMap)

    return response
  }

  static async setRating(id: string, rating: number) {
    const url = `${Endpoints.tests}/${id}/rating`

    const { data: response } = await axiosInstance.put<TestType>(url, { rating })

    return response
  }
}

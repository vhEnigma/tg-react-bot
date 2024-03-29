import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'

type LoginUserResponseType = {
  token: string
}
export type UserType = {
  id: number
  email: string
  first_name: string
  last_name: string
  picture: unknown
  is_active: boolean
  is_admin: boolean
  date_register: string
  test_results: TestResult[]
}

export type TestResult = {
  id: number
  name: string
  result: number
  rating: number
}

export class UserService {
  static async loginUserRequest(initDataString: string) {
    const { data: response } = await axiosInstance.get<LoginUserResponseType>(Endpoints.user.login, {
      params: { initData: initDataString }
    })
    return response
  }

  static async getUserInfo(id: number) {
    const { data: response } = await axiosInstance.get<UserType>(`${Endpoints.user.getUser}/${id}`)

    return response
  }
}

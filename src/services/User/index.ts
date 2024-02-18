import { Endpoints } from '../client/endpoints'
import { axiosInstance } from '../client/httpClient'

type LoginUserResponseType = {
  token: string
}

export class UserService {
  static async loginUser(initDataString: string) {
    const { data: response } = await axiosInstance.get<LoginUserResponseType>(Endpoints.user.login, {
      params: { initData: initDataString }
    })
    return response
  }
}

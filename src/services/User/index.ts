import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

type LoginUserResponseType = {
  token: string
}


export class UserService {
  static async loginUserRequest(initDataString: string) {
    const { data: response } = await axiosInstance.get<LoginUserResponseType>(Endpoints.user.login, { params: { initData: initDataString } })
    return response
  }

}

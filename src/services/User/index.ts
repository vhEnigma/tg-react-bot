import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'

type LoginuserResponseType = {
  token: string
  tokenType: string
}


export class UserService {
  static async loginUserRequest(initDataString: string) {
    const { data: response } = await axiosInstance.get<LoginuserResponseType>(Endpoints.user.login, { params: { initData: initDataString } })
    return response
  }

}

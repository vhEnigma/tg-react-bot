import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'


export class UserService {
  static async loginUserRequest(initDataString: string) {

    await axiosInstance.get(Endpoints.user.login, { params: { initData: initDataString } })

    // return response
  }

}

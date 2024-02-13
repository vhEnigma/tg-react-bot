import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'


export class UserService {
  static async loginUserRequest(initDataString: string) {
    const url = `${Endpoints.user.login}?initData=` + initDataString

    await axiosInstance.get(url)

    // return response
  }

}

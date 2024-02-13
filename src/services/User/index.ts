import { Endpoints } from '../client/endpoints.ts'
import { axiosInstance } from '../client/httpClient.ts'


export class UserService {
  static async loginUserRequest(initDataString: string) {
    console.log(initDataString)
    const url = `${Endpoints.user.login}`

    await axiosInstance.get(url)

    // return response
  }

}

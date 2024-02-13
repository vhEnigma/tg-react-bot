import { TOKEN_KEY, USER_DATA_KEY } from '../../constants/token.ts'


export class TokenService {
  static saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  static saveUserData(data: string) {
    localStorage.setItem(USER_DATA_KEY, data)
  }

  static removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  }

}

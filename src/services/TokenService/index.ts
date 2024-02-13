import { TOKEN_KEY } from '../../constants/token.ts'


export class TokenService {
  static saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  static removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  }

}

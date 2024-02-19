import axios from 'axios'
import { TOKEN_KEY } from '../../constants/token'
import { UserService } from '../User'
import { TokenService } from '../TokenService'

const API_URL = 'https://whole-formerly-robin.ngrok-free.app/api/v1/'
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru', 'ngrok-skip-browser-warning': 'true' }
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403) {
      window.Telegram.WebApp.close()
      TokenService.removeToken()
    }
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { initData } = window.Telegram.WebApp
        if (initData) {
          const { token } = await UserService.loginUserRequest(initData)
          TokenService.saveToken(token)
          return await axiosInstance.request(originalRequest)
        }
      } catch (e) {
        console.error(e)
      }
    }
    throw error
  }
)

import axios from 'axios'

const API_URL = 'https://rarely-modern-ray.ngrok-free.app/api/v1/'
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', 'Accept-Language': 'ru' },
  withCredentials: true
})
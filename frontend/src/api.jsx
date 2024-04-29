import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

const subApi = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

const refreshToken = async(token) => {
  const newToken = await subApi.post('auth/token/refresh/',{refresh:token})
  return newToken.data.access
}

api.interceptors.request.use(async(config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  const dateNow = Date.now() / 1000
  if (token){
    let latestToken = token
    const decoded = jwtDecode(token)
    
    if (dateNow > decoded.exp){
      const newToken = await refreshToken(token)
      latestToken = newToken
      localStorage.setItem('ACCESS_TOKEN',
      latestToken)
    }
    config.headers.Authorization = `Bearer ${latestToken}`
    
  }
  return config
})

export default api;
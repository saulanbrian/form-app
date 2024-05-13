import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

const refreshToken = async() => {
  
  const refresh = localStorage.getItem('REFRESH_TOKEN')
  
  const res = await axios.post('http://127.0.0.1:8000/auth/token/refresh/',{refresh:refresh})
    
  if (res.status === 200){
    localStorage.setItem('ACCESS_TOKEN',res.data.access)
    return res.data.access
  }else{
    return null
  }
    
}
  


api.interceptors.request.use(
  
  async(config) => {
    const dateNow = Date.now() / 1000
    const token = localStorage.getItem('ACCESS_TOKEN')
    let latestToken = token
    
    if (token){
      const decoded = jwtDecode(token)
      
      if (dateNow > decoded.exp){
        const newToken = await refreshToken()
        if(newToken){
          latestToken = newToken
        }
      }
      
      config.headers.Authorization = `Bearer ${latestToken}`
    }
    
    return config
  }
  
  )
  
export default api;
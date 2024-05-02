import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

const refreshToken = async(refresh) =>{
  
  try{
    const res = await axios.get('http://127.0.0.1:8000/auth/token/refresh/',{refresh:refresh})
    
    if (res.status === 200){
      const newToken = res.data.token
      return newToken
    }else{
      throw ('an error has occured.')
    }
    
  }catch(e){
    console.log(e.message)
    return null
  }
  
  
  
}

api.interceptors.request.use(config => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  const dateNow = Date.now() / 1000
  
  if (token){
    const decoded = jwtDecode(token)
    let latestToken = token
    if (dateNow < decoded.exp){
      latestToken = refreshToken(token);
    }
    config.headers.Authorization = `Bearer ${latestToken}`
  }
  return config
})

export default api;
import {useEffect,useState} from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}){
  
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    
    let access = localStorage.getItem('ACCESS_TOKEN')
    const refresh = localStorage.getItem('REFRESH_TOKEN')
    const currentTime = Math.floor(Date.now()/1000)
    
    
    const refreshToken = async() => {
      const res = await api.post('auth/token/refresh/',{refresh:refresh})
      if (res.status != 200){
        setIsAuthenticated(false)
      }else{
        localStorage.setItem('ACCESS_TOKEN',res.data.access)
      }
    }
    
    
    if (access){
      setIsAuthenticated(true)
      const decoded = jwtDecode(access)
      if(currentTime > decoded.exp){
        console.log('token expired')
        refreshToken();
      }
    }
    setLoading(false)
  },[])
  
  if(loading){
    console.log('loading')
    return <h1>loading..</h1>
  }
  
  return isAuthenticated? children: <Navigate to='../auth/sign-in/' />
  
}

export default ProtectedRoute;
import api from '../api'
import { useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import { useJwt } from 'react-jwt'

function ProtectedRoute({children}){
  
  const [isAuthenticated,setIsAuthenticated] = useState(null)
  
  const token = localStorage.getItem('ACCESS_TOKEN')
  const { decoded,isExpired } = useJwt(token);  
  
  const  refresh = async() =>{
    const refreshToken = localStorage.getItem('REFRESH_TOKEN')
    const res = await api.post('auth/token/refresh',{refresh:refreshToken})
    
    if (!res.ok){
      alert('cant refresh token')
      setIsAuthenticated(false)
    }else{
      setIsAuthenticated(true)
    }
    
  }
  
  function auth(){

    if (token){
      if (!isExpired){
        console.log(isExpired)
        alert('token still valid')
        setIsAuthenticated(true)
      }else{
        refresh()
      }
      
    }else{
      alert('no token detected')
      setIsAuthenticated(false)
    }
    
  }
  
  useEffect(() => {
    auth();
  },[])
  
  return isAuthenticated ? children : <Navigate to='/' />
  
}

export default ProtectedRoute;
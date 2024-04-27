import {useEffect,useState} from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}){
  
  const [isAuthenticated,setIsAuthenticated] = useState(null)
  const [loading,setLoading] = useState(true)
  
  const access = localStorage.getItem('ACCESS_TOKEN')
  const refresh = localStorage.getItem('REFRESH_TOKEN')
  const currentTime = Math.floor(Date.now()/1000)
  
  
  
  useEffect(()=>{
    if (access){
      const decoded = jwtDecode(access)
      if (currentTime < decoded.exp){
        setIsAuthenticated(true)
      }else{
        api.post('auth/token/refresh/',{refresh:refresh})
        .then(res => {
          if (res.status === 200){
            localStorage.setItem('ACCESS_TOKEN',res.data.access)
            setIsAuthenticated(true)
          }else{
            setIsAuthenticated(false)
          }          
        })
      }
    }else{
      setIsAuthenticated(false)
    }
    setLoading(false)
     
  },[])
  
  if (!loading){
    return isAuthenticated? children: <Navigate to='../auth/sign-in/' />
  }else{
    return <h1>loading...</h1>
  }
  
}

export default ProtectedRoute;
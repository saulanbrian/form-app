import { createContext,useState,useEffect, useContext} from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api'

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext)
}

const dateNow = Date.now() / 1000

const refreshToken = async() => {
  
  const refresh = localStorage.getItem('REFRESH_TOKEN')
  
  const res = await api.post('auth/token/refresh/',{refresh:refresh})
  
  if(res.status === 200){
    return res.data.access
    console.log('token is refreshed')
  }else{
    console.log(res.data)
    return null
  }
  
}

const auth = async() =>{
  const token = localStorage.getItem('ACCESS_TOKEN')
  if (token){
    const decoded = jwtDecode(token)
    if (decoded.exp > dateNow){
      return true
    }else{
      const newToken = await refreshToken()
      if (newToken){
        localStorage.setItem('ACCESS_TOKEN',newToken)
        return true
      }
    }
  }else{
    return false
  }
}

export function UserContextProvider({children}){
  const [user,setUser] = useState(null)
  const [isAuthenticated,setIsAuthenticated] = useState(null)
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    
    const authenticate = async() => {
      const authenticated = await auth()
      setIsAuthenticated(authenticated)
      console.log('finished')
    }
    
    authenticate();
  },[isAuthenticated])
  
  function login({access,refresh}){
    localStorage.setItem('ACCESS_TOKEN',access)
    localStorage.setItem('REFRESH_TOKEN',refresh)
    setIsAuthenticated(true)
  }
  
  return (
  <UserContext.Provider value={{user,setUser,isAuthenticated,login}}>
    { children }
  </UserContext.Provider>
);
}
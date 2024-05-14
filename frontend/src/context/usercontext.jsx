import { createContext,
  useContext, useState, useEffect } from 'react'
  
import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const useAuth = () => {
  return useContext(UserContext)
}

function UserContextProvider({children}){
  
  const [user,setUser] = useState(null)
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const dateNow = Date.now() / 1000
  
  function setTokens({access,refresh}){
    localStorage.setItem('REFRESH_TOKEN',refresh)
    localStorage.setItem('ACCESS_TOKEN',access)
    const decoded = jwtDecode(access)
    setUser({
      id:decoded.user_id,
      username:decoded.username
    })
    setIsAuthenticated(true)
  }
  
  useEffect(()=>{
    const refresh = localStorage.getItem('REFRESH_TOKEN')
    //if refresh token is still valid, we can definitely make an authorized request
    console.log(refresh)
    if (refresh){
      const decoded = jwtDecode(refresh)
      if (decoded.exp > dateNow){
        setUser({
          id:decoded.user_id,
          username:decoded.username,
        })
        setIsAuthenticated(true)
      }else{
        localStorage.clear()
      }
    }

  },[])
  
  return <UserContext.Provider value={{
    user,isAuthenticated,setUser,setIsAuthenticated,setTokens
  }}>
    { children }
  </UserContext.Provider>
  
}

export default UserContextProvider;
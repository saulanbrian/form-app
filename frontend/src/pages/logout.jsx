import { useAuth } from '../context/usercontext'
import { Navigate } from 'react-router-dom'

function Logout(){
  
  const { setIsAuthenticated } = useAuth();
  localStorage.clear()
  setIsAuthenticated(false)
  
  return <Navigate to='/' />
  
}

export default Logout;
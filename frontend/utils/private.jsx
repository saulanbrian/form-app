import { useAuth } from '../src/context/usercontext'
import { Navigate } from 'react-router-dom'

function Private({children}){
  
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated? children: <h1>login first</h1>// <Navigate to='/login'/>
  
}

export default Private;
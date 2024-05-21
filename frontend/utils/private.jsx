import { useAuth } from '../src/context/usercontext'
import { Navigate } from 'react-router-dom'
import Loader from '../src/component/loader.jsx'

function Private({children}){
  
  const { isAuthenticated,isLoading } = useAuth();
  
  if (isLoading) return <Loader />
  
  return isAuthenticated? children: <Navigate to='/login'/>
  
}

export default Private;
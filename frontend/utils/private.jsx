import { useAuth } from '../src/context/usercontext'
import { Navigate,useLocation } from 'react-router-dom'
import Loader from '../src/component/loader.jsx'

function Private({children}){
  
  const { isAuthenticated,isLoading } = useAuth();
  const location = useLocation()
  
  
  if (isLoading) return <Loader />
  
  return isAuthenticated? children: 
    <Navigate to='/login' state={{pathFrom:location.pathname}}/>
  
}

export default Private;
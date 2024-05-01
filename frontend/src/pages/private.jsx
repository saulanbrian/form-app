import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/usercontext'

function Private({children}){
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated? children: <Navigate to='../login' />
}

export default Private;
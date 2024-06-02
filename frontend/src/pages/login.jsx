import AuthForm from '../component/authform'
import { useAuth } from '../context/usercontext'
import { useActionData, Navigate, useLocation } from 'react-router-dom'
import api from '../api'
import { jwtDecode } from 'jwt-decode'
import { useEffect,useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'

function Login(){

  const style = {
    minHeight:'100vh'
  }
  
  const data = useActionData()
  const { isAuthenticated, setTokens } = useAuth()
  const location = useLocation()
  
  const pathFrom = useMemo(() => location.state?.pathFrom || '/',[])
  
  const queryClient = useQueryClient()
  
  useEffect(() => {
      if(data){
        queryClient.invalidateQueries()
        const access = data.access
        const refresh = data.refresh
        setTokens({access,refresh})
      }
      
    },[data])
  
  if (isAuthenticated) return <Navigate to={pathFrom}/>
  
  return <div className='container-fluid d-flex justify-content-center align-items-center bg-primary-subtle d' style={style}>
    <AuthForm userAction='login' />
  </div>
}

export default Login

export async function LoginAction({request}){

  const formData = await request.formData();
  
  try{
    const res = await api.post('auth/token/',{
      username:formData.get('username'),
      password:formData.get('password')
    })
    
    if (res.status === 200){
      return res.data
    }
    
  }catch(e){
    console.log(e.response.message)
  }
  
  return null 
  
}
import AuthForm from '../component/authform'
import { useAuth } from '../context/usercontext'
import { useActionData, Navigate } from 'react-router-dom'
import api from '../api'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'

function Login(){
  
  const data = useActionData()
  const { isAuthenticated, setTokens } = useAuth()
  
  if (isAuthenticated) return <Navigate to='/' />
  
  useEffect(() => {
    if(data){
      const access = data.access
      const refresh = data.refresh
      setTokens({access,refresh})
    }
    
  },[data])
  
  return <>
    <AuthForm action='' method='login' />
  </>
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
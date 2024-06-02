import AuthForm from '../component/authform.jsx'
import { useActionData, Navigate, redirect } from 'react-router-dom'
import api from '../api.jsx'

function SignUp(){

  const style = {
    minHeight:'100vh'
  }
  
  const data = useActionData()
  
  if (data && data.success) {
    return <Navigate to='/success' state={{message:'account successfuly created',redirect:'/login',redirectMessage:'login'}}/>}
  
  return <div className='container-fluid d-flex justify-content-center align-items-center bg-primary-subtle d' style={style}><AuthForm userAction={'register'} /></div>
}

export default SignUp;

export const SignUpAction = async({request}) => {
  const formData = await request.formData()
  
  const username = formData.get('username')
  const password = formData.get('password')
  const confirmation = formData.get('confirmation')
  
  if (password != confirmation){
    return { invalid:{message:'password do not match'} }
  }
  
  try{
    const res = await api.post('account/create/',{
      username:username,
      password:password,
    })
    
    if (res.status === 201){
      return { success:{message:'account created'} }
    }
    
  }catch(e){
    return {error:{data:e.response.data}}
  }
  
  
}
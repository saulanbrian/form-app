import AuthForm from '../component/authform.jsx'
import { useActionData, Navigate } from 'react-router-dom'
import api from '../api.jsx'

function SignUp(){
  
  const data = useActionData()
  
  if (data && data.error) console.log(data.error.data)
  
  if (data && data.success) {
    alert(data.success.message)
    return <Navigate to='../login' />}
  
  return <AuthForm userAction={'register'} />
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